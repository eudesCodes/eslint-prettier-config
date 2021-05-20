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
import { headerComments } from './license_comment';

/**
 * @constant
 * @description :
 */
// @name  NODES_MODULE_PATH
const NODES_MODULE_PATH: string = join(process.cwd(), 'node_modules');
// @name  OUT_FILE_PATH
const OUT_FILE_PATH: string = join(process.cwd(), 'ACKNOWLEDGMENTS.md');
// @name  ROOT_PACKAGE_PATH
const ROOT_PACKAGE_PATH: string = join(process.cwd(), 'package.json');

// Read the dependencies property
const { dependencies } = require(ROOT_PACKAGE_PATH);

/**
 * @function
 * @name getLicenseContents -
 * @param { string } name   name of dependencie
 * @return { Promise<string> }
 */
const getLicenseContents = async (name: string): Promise<any> => {
    // license contents
    let licenseContents: string = '';

    // find the depencie path
    const DEPENCIE_PATH: string = join(NODES_MODULE_PATH, name);

    // verif licence file
    const verifIfLicenseFileExist = (fileName: string): boolean => {
        return /^licen[s|c]e/i.test(fileName);
    };

    // @name License File
    const LicenseFile = (await fs.promises.readdir(DEPENCIE_PATH)).find(verifIfLicenseFileExist);

    if (LicenseFile) {
        // license path
        const LicenseFile_PATH: string = join(DEPENCIE_PATH, LicenseFile);

        // read license file
        licenseContents = (await fs.promises.readFile(LicenseFile_PATH, 'utf8')).trim();
    } else {
        // get dependencie package json
        const LicenseFile_PACKAGE_PATH: string = join(DEPENCIE_PATH, 'package.json');

        const { license } = JSON.parse(
            await fs.promises.readFile(LicenseFile_PACKAGE_PATH, 'utf8'),
        );
        if (license) {
            licenseContents = `License: ${license}`;
        }
    }

    return [
        `## ${name}`,
        '',
        ...licenseContents.split(/\r?\n/).map((line) => {
            return line.trim();
        }),
        '',
    ].join('\n');
};

// generated a content in  OUT_FILE_PATH
(async () => {
    await fs.promises.writeFile(
        OUT_FILE_PATH,
        [
            headerComments(OUT_FILE_PATH),
            '',
            '# Acknowledgments',
            '',
            (await pMAp([...Object.keys(dependencies)].sort(), getLicenseContents)).join('\n'),
        ].join('\n'),
    );
})();
