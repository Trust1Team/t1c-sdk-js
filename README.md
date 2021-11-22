# Trust1Connector JavaScript SDK
[![][t1c-logo]][Trust1Connector-url]

The Trust1Connector SDK (t1c-sdk-js), is a javascript library to facilitate the integration with the Trust1Connector. The library simplifies the execution to the connector and works asynchronously.
This is version 3 of the library, and is intended to be used with Trust1Connector v3+. For previous versions (v1 and v2), please refer to: [t1c-lib-js (v1/v2)][Trust1Connector-archived-t1c-lib]

When the Trust1Connector isn’t installed the library will return an uninitialised client which can be used to download a client installer.

## Documentation
Documentation is available on [gitbook](https://app.gitbook.com/@t1t/s/t1c-js-guide-v3/).

## Backwards compatibility
The library will detect the installed version of Trust1Connector and will only function with version 3.0.0 and higher.

If you have version 1/2.x.x installed you have two options:

  * Upgrade to version 3+ (recommended)
  * Use an older version of the library by running:

```bash
$ npm i trust1connector@2.4.3
```
> __For security reasons v1 and v2 are deprecated__

## Community
We're present on Gitter in the following room:
[Trust1Connector-gitter]

## Build from source
To build the Trust1Connector JS SDK yourself you need to do the following:
```shell script
$ yarn 
// or 
$ npm install
```
```shell script
$ yarn build-prod
// or
$ npm run build-prod
```
The outcome can be found in the folders
* dist
* lib
* lib-esm

Starting from node 17 the OpenSSL provider has been updated. To build the SDK export the following variable
```shell
export NODE_OPTIONS=--openssl-legacy-provider
```


## Development
Verify the dependencies, actual vs new versions
```shell script
npm outdated
```
To build the library locally
```bash
yarn build-dev
```
This will create a T1CSdk.js in the dist folder

## Installation - OSX Only
Make sure you have NodeJS installed on your machine. Use of Yarn is recommended but not required.

### Webpack
Webpack is needed to build the Javascript library
```bash
$ npm install --global webpack
```

### Dependencies
Navigate to the root directory and use Yarn to download and the necessary dependencies
```bash
$ yarn
```
### OR
Use npm install
```bash
$ npm install
```

## License

```
This file is part of the Trust1Team(R) sarl project.
Copyright (c) 2020 Trust1Team sarl
Authors: Trust1Team development


This program is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation with the addition of the
following permission added to Section 15 as permitted in Section 7(a):
FOR ANY PART OF THE COVERED WORK IN WHICH THE COPYRIGHT IS OWNED BY Trust1T,
Trust1T DISCLAIMS THE WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program; if not, see http://www.gnu.org/licenses or write to
the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
Boston, MA, 02110-1301 USA.

The interactive user interfaces in modified source and object code versions
of this program must display Appropriate Legal Notices, as required under
Section 5 of the GNU Affero General Public License.


You can be released from the requirements of the Affero General Public
License by purchasing a commercial license. Buying such a license is
mandatory if you wish to develop commercial activities involving the Trust1T
software without disclosing the source code of your own applications.
Examples of such activities include: offering paid services to customers as
an ASP, signing PDFs on the fly in a web application, shipping OCS with a
closed source product...
Irrespective of your choice of license, the T1T logo as depicted below may
not be removed from this file, or from any software or other product or
service to which it is applied, without the express prior written permission
of Trust1Team sarl.
The T1T logo is an EU Registered Trademark (n° 12943131).
```

[Trust1Team-url]: http://trust1team.com
[Trust1Connector-url]: http://www.trust1connector.com
[Trust1Connector-archived-t1c-lib]: https://github.com/Trust1Team/t1c-lib-js
[Trust1Connector-gitter]: https://gitter.im/Trust1Team/Trust1Connector?utm_source=share-link&utm_medium=link&utm_campaign=share-link
[t1t-logo]: http://imgur.com/lukAaxx.png
[t1c-logo]: http://i.imgur.com/We0DIvj.png
[jwt-up-doc]: https://trust1t.atlassian.net/wiki/pages/viewpage.action?pageId=74547210
