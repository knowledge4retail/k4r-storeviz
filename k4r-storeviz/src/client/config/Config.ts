export class Config {
  private static config: Map<string, string> = new Map()

  public static dtApiGraphQLEndpoint(): string {
    return String(Config.config.get('DT_API_GRAPHQL_ENDPOINT'))
  }

  public static backgroundColor(): number {
    return Number(Config.config.get('BACKGROUND_COLOR'))
  }

  public static offsetToBottomLeft(): boolean {
    //return Boolean(Config.config.get('OFFSET_TO_BOTTOM_LEFT'));
    return Config.config.get('OFFSET_TO_BOTTOM_LEFT') == 'true'
  }

  public static renderTexture(): boolean {
    //return Boolean(Config.config.get('OFFSET_TO_BOTTOM_LEFT'));
    return Config.config.get('RENDER_TEXTURE') == 'true'
  }

  public static async fetch() {
    return new Promise(function (resolve, reject) {
      fetch('/../config/config.json')
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          const keys = Object.keys(json)
          for (let i = 0; i < keys.length; i++) {
            Config.config.set(String(keys[i]), String(json[keys[i]]))
          }
          resolve(true)
        })
    })
  }
}
