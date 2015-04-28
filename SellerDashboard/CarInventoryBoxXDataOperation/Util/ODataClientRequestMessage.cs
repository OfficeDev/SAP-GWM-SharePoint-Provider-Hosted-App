// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
using Microsoft.Data.OData;
#if EnableODataAsync
using System.Threading.Tasks;
#endif
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace CarInventoryBoxXDataOperation.Util
{
    /// <summary>
    /// Implementation of the IODataRequestMessage interface using the client HTTP stack.
    /// </summary>
    public class ODataClientRequestMessage :
#if EnableODataAsync
        IODataRequestMessageAsync
#else
 IODataRequestMessage
#endif
    {
        /// <summary>
        /// The underlying web request object.
        /// </summary>
        private readonly HttpWebRequest _webRequest;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="requestUrl">The URL to create the request for.</param>
        public ODataClientRequestMessage(Uri requestUrl, string httpMethod)
        {
            _webRequest = (HttpWebRequest)WebRequest.Create(requestUrl);
            _webRequest.Method = httpMethod;
        }

        /// <summary>
        /// The HTTP headers on this message.
        /// </summary>
        public IEnumerable<KeyValuePair<string, string>> Headers
        {
            get
            {
                return _webRequest.Headers.AllKeys.Select(headerName =>
                    new KeyValuePair<string, string>(headerName, _webRequest.Headers.Get(headerName)));
            }
        }

        /// <summary>
        /// The HTTP method (verb) of the request.
        /// </summary>
        public string Method
        {
            get
            {
                return _webRequest.Method;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    throw new ArgumentException("Method must be a non-empty string.", "value");
                }

                _webRequest.Method = value;
            }
        }

        /// <summary>
        /// The URL for the request.
        /// </summary>
        public Uri Url
        {
            get
            {
                return _webRequest.RequestUri;
            }
            set
            {
                throw new InvalidOperationException("The request's Url property can't be modified, it has to be specified in the constructor.");
            }
        }

        /// <summary>
        /// Get a value of an HTTP header.
        /// </summary>
        /// <param name="headerName">The name of the HTTP header to get the value for.</param>
        /// <returns>The value of the HTTP header or null if no such header exists on the message.</returns>
        public string GetHeader(string headerName)
        {
            if (headerName == null)
            {
                throw new ArgumentNullException("headerName");
            }

            return _webRequest.Headers.Get(headerName);
        }

        /// <summary>
        /// Gets the content of the message as a stream.
        /// </summary>
        /// <returns>The content/body of the message as a stream.</returns>
        /// <remarks>
        /// This will only ever be called once and the caller will dispose the stream.
        /// In this implementation the returned stream is write only (since this message is to write requests).
        /// </remarks>
        public Stream GetStream()
        {
            return _webRequest.GetRequestStream();
        }

#if EnableODataAsync
        /// <summary>
        /// Asynchronously gets the content of the message as a stream. 
        /// </summary>
        /// <returns>A task which represent the asynchronous operation of getting the content stream of the message.</returns>
        /// <remarks>
        /// This will only ever be called once and the caller will dispose the stream.
        /// In this implementation the returned stream is write only (since this message is to write requests).
        /// </remarks>
        public Task<Stream> GetStreamAsync()
        {
            return this.webRequest.GetRequestStreamAsync();
        }
#endif

        /// <summary>
        /// Sets the value of an HTTP header on this message.
        /// </summary>
        /// <param name="headerName">The name of the HTTP header to set the value for.</param>
        /// <param name="headerValue">The value to set.</param>
        /// <remarks>
        /// If the <paramref name="headerValue"/> is specified as null,
        /// it means the header with the <paramref name="headerName"/> should be removed from the message.
        /// </remarks>
        public void SetHeader(string headerName, string headerValue)
        {
            if (headerName == null)
            {
                throw new ArgumentNullException("headerName");
            }

            // Some of the headers can't be set through the WebRequest.Headers collection.
            // Instead they have to be set as properties on the HttpWebRequest object.
            // Note that HTTP headers are case insensitive.
            if (string.Equals(headerName, "Accept", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.Accept = headerValue;
            }
            else if (string.Equals(headerName, "Content-Length", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.ContentLength = headerValue == null ? -1 : long.Parse(headerValue);
            }
            else if (string.Equals(headerName, "Content-Type", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.ContentType = headerValue;
            }
            else if (string.Equals(headerName, "Date", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.Date = headerValue == null ? DateTime.MinValue : DateTime.Parse(headerValue);
            }
            else if (string.Equals(headerName, "Expect", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.Expect = headerValue;
            }
            else if (string.Equals(headerName, "Host", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.Host = headerValue;
            }
            else if (string.Equals(headerName, "If-Modified-Since", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.IfModifiedSince = headerValue == null ? DateTime.MinValue : DateTime.Parse(headerValue);
            }
            else if (string.Equals(headerName, "Referer", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.Referer = headerValue;
            }
            else if (string.Equals(headerName, "Transfer-Encoding", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.TransferEncoding = headerValue;
            }
            else if (string.Equals(headerName, "User-Agent", StringComparison.OrdinalIgnoreCase))
            {
                _webRequest.UserAgent = headerValue;
            }
            else
            {
                if (headerValue == null)
                {
                    _webRequest.Headers.Remove(headerName);
                }
                else
                {
                    _webRequest.Headers.Set(headerName, headerValue);
                }
            }
        }

        /// <summary>
        /// Gets the response for this request.
        /// </summary>
        /// <returns>The response message.</returns>
        /// <remarks>
        /// This method is not part of the IODataRequestMessage interface. It's here to make the usage of these classes easier.
        /// It also handles OData errors by recognizing them and parsing them.
        /// Each implementation of the interfaces is expected to provide its own way to create the instances and or get them somewhere.
        /// </remarks>
        public IODataResponseMessage GetResponse()
        {
            try
            {
                ServicePointManager.ServerCertificateValidationCallback = (sender, cert, chain, errors) => true;
                return new ODataClientResponseMessage((HttpWebResponse)_webRequest.GetResponse());
            }
            catch (WebException webException)
            {
                if (webException.Response != null)
                {
                    // If there is an error response, try to read it.
                    var errorResponseMessage = new ODataClientResponseMessage((HttpWebResponse)webException.Response);
                    using (ODataMessageReader messageReader = new ODataMessageReader(errorResponseMessage))
                    {
                        // The payload kind detection will determine if the payload is an error by looking at the content type (and possibly even the payload).
                        if (messageReader.DetectPayloadKind().Any(payloadKindDetectionResult => payloadKindDetectionResult.PayloadKind == ODataPayloadKind.Error))
                        {
                            // Construct the error message by concatenating all the error messages (including the inner ones).
                            // Makes it easier to debug problems.
                            ODataError error = messageReader.ReadError();

                            // If it is an error throw the ODataErrorException, it's easier to recognize and also read.
                            throw new ODataErrorException(CreateODataErrorExceptionMessage(error), error);
                        }
                    }
                }

                throw;
            }
        }

#if EnableODataAsync
        /// <summary>
        /// Asynchronously gets the response for this request.
        /// </summary>
        /// <returns>The response message.</returns>
        /// <remarks>
        /// This method is not part of the IODataRequestMessage interface. It's here to make the usage of these classes easier.
        /// Each implementation of the interfaces is expected to provide its own way to create the instances and or get them somewhere.
        /// </remarks>
        public async Task<IODataResponseMessageAsync> GetResponseAsync()
        {
            WebException webException;

            try
            {
                HttpWebResponse webResponse = (HttpWebResponse)(await this.webRequest.GetResponseAsync());
                return new ClientHttpResponseMessage(webResponse);
            }
            catch (WebException exception)
            {
                webException = exception;
            }

            if (webException.Response != null)
            {
                // If there is an error response, try to read it.
                IODataResponseMessageAsync errorResponseMessage = new ClientHttpResponseMessage((HttpWebResponse)webException.Response);
                using (ODataMessageReader messageReader = new ODataMessageReader(errorResponseMessage))
                {
                    // The payload kind detection will determine if the payload is an error by looking at the content type (and possibly even the payload).
                    if ((await messageReader.DetectPayloadKindAsync()).Any(payloadKindDetectionResult => payloadKindDetectionResult.PayloadKind == ODataPayloadKind.Error))
                    {
                        // Construct the error message by concatenating all the error messages (including the inner ones).
                        // Makes it easier to debug problems.
                        ODataError error = await messageReader.ReadErrorAsync();

                        // If it is an error throw the ODataErrorException, it's easier to recognize and also read.
                        throw new ODataErrorException(CreateODataErrorExceptionMessage(error), error);
                    }
                }
            }

            throw webException;
        }
#endif

        /// <summary>
        /// Creates an exception message from the specified OData error.
        /// </summary>
        /// <param name="error">The OData error instance to create exception message for.</param>
        /// <returns>Exception message created from the <paramref name="error"/>.</returns>
        private static string CreateODataErrorExceptionMessage(ODataError error)
        {
            Debug.Assert(error != null, "error != null");
            StringBuilder errorMessage = new StringBuilder(error.Message);
            ODataInnerError innerError = error.InnerError;
            while (innerError != null)
            {
                errorMessage.AppendLine();
                errorMessage.Append(innerError.Message);
                innerError = innerError.InnerError;
            }

            return errorMessage.ToString();
        }
    }
}
//********************************************************* 
// 
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// ""Software""), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// 
//*********************************************************
