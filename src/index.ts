import * as https from 'https';

/**
 * Calls the GitHub Licenses API https://api.github.com/licenses in order to get a list of supported licenses or a specific license text.
 *
 * Some licenses, such as GPL-2.0, GPL-3.0 and MIT, contain placeholders `[year]` and `[fullname]` that may be substituted by the user.
 *
 * @param spdxIdentifier an optional SPDX license ID supported by the GitHub License API, consisting only of characters [a-zA-Z0-9.-]
 * @returns a multiline string of supported licenses `${spdx_identifier}\t${license_name}` if no SPDX identifier is given,
 *          the license text according to the SPDX license ID otherwise.
 */
function githubLicense(spdxIdentifier?: string): Promise<string> {
    return spdxIdentifier
        ? _call_github_api<{ body: string }>().then(response => response.body)
        : _call_github_api<[{ spdx_id: string, name: string }]>().then(licenses =>
            licenses.map(({ spdx_id, name }) => `${spdx_id}\t${name}`).sort().join('\n'));

    function _call_github_api<T>(): Promise<T> {
        const baseUrl = 'https://api.github.com/licenses';
        const url = spdxIdentifier ? `${baseUrl}/${spdxIdentifier}` : baseUrl;
        const options = { headers: { 'User-Agent': 'node' } };
        return new Promise((resolve, reject) => {
            const request = https.get(url, options, (response) => {
                let data = '';
                response
                    .on('data', (chunk) => data += chunk)
                    .on('end', () => response.statusCode === 200 ? resolve(JSON.parse(data)) : reject(Error(String(response.statusCode))))
                    .on("error", reject);
            });
            request.on('error', reject);
        });
    }
}

namespace githubLicense {}

export = githubLicense;