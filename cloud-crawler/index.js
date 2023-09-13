const http = require('@actions/http-client')
const core = require('@actions/core')

const client = new http.HttpClient('meilisearch-cloud-crawler')

try {
  const ignoreConcurrencyError = core.getInput('ignoreConcurrencyError', { required: true }) || 'true';
  const env = core.getInput('env', { required: false }) || "production";
  const token = core.getInput('token', { required: true })
  const url = {
    "production": "https://api.meilisearch.dev",
    "staging": "https://api.meilisearch.dev"
  }[env];

  client
    .postJson(`${url}/api/v1/crawlers/start`, {}, { Authorization: `Bearer ${token}` })
    .then((response) => {
      core.info(`status ${response.statusCode}`)
      core.info('message', "Success! Your crawler is running now.")
    })
    .catch((error) => {
      if (error.statusCode === 401) {
        core.error("Ooops! Did you forget to set the token in the action configuration? Check the README for more information!")
      } else if (error.statusCode == 422) {
        core.info(JSON.stringify(error.result))
        core.warning("You can't run multiple crawlers at the same time!")

        if (ignoreConcurrencyError === 'true') {
          core.warning('ignoreConcurrencyError is true, skipping error.')
        } else {
          core.setFailed('ignoreConcurrencyError is false, setting a failed exit code.')
        }
      } else {
        core.error(JSON.stringify(error.result))
        core.setFailed(`Something not expected happen! Please contact us.`)
      }
    })
} catch (error) {
  core.setFailed(error.message)
}
