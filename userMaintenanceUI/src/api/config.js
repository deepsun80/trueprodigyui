/**
 * Created by developer on 23.10.17.
 */
import { get } from './request';
export async function getConfiguration () {
  const { body: { urls } } = await get(null, '/config/config.json');
  const { body: version } = await get(null, '/version.json');
  return {
    urls,
    version: {
      version: version.version,
      versionFull: `${version.version} build ${version.build} (${version.timestamp})`
    }
  };
}

