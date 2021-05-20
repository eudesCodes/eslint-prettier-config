/*
 Copyright (c) 2020 - 2021 https://eudes.codes/
 @author: Eudes Evrard BOBBOH - EBO
 @country: France
 @email: evrard@eudes.codes
 @website: https://eudes.codes/
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ /* eslint-disable no-undef */
import { join } from 'path';
import * as fs from 'fs';
import pMAp from 'p-map';

/**
 * @function
 * @name headerComments
 * @description:
 */
const headerComments = (Path: string): any => {
    // @constant  name dateOfCreation
    const dateOfCreation: number = 2020;
    // @constant  name currentDate
    const currentDate: number = new Date().getFullYear();

    const COPYRIGHT: string = ` Copyright (c) ${dateOfCreation} - ${currentDate} https://eudes.codes/`;
    const AUTHOR: string = ' @author: Eudes Evrard BOBBOH - EBO';
    const COUNTRY: string = ' @country: France';
    const E_MAIL: string = ' @email: evrard@eudes.codes';
    const WEBSITE: string = ' @website: https://eudes.codes/';
    const LICENSE: string =
        "THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";

    // extensions
    const EXTENSIONS_TO_CHECK = new Set(['html', 'txt', 'md']);
    const FILE_EXTENSIONS = Path.split('.').pop();

    if (FILE_EXTENSIONS && !EXTENSIONS_TO_CHECK.has(FILE_EXTENSIONS))
        return ['/*', COPYRIGHT, AUTHOR, COUNTRY, E_MAIL, WEBSITE, LICENSE, '*/'].join('\n');

    // @return
    return ['<!--', COPYRIGHT, AUTHOR, COUNTRY, E_MAIL, WEBSITE, LICENSE, '-->'].join('\n');
};

/**
 *
 * @param filePath
 */
const addHeaderComment = (filePath: string): void => {
    fs.readFile(filePath, 'utf8', async (_error: any, result: any) => {
        if (result) {
            //

            await fs.promises.writeFile(
                filePath,
                headerComments(filePath) + result.split(headerComments(filePath)).join(''),
            );
        }
    });
};

// Read the dependencies property
const { files = [] } = require(join(process.cwd(), 'package.json'));

//
(async () => await pMAp(files, addHeaderComment))();

export { headerComments };
