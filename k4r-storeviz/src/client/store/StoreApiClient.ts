import { IStore } from './IStore'
import { IShelf } from './IShelf'
import { GraphQLClient, request, gql } from 'graphql-request'
import { Config } from '../config/Config'

export namespace StoreApiClient {
  function getClient(): GraphQLClient {
    return new GraphQLClient(Config.dtApiGraphQLEndpoint(), {
      credentials: 'include',
      mode: 'cors',
    })
  }

  export async function getStores(): Promise<IStore[]> {
    const query = gql`
      query {
        stores {
          id
          storeName
        }
      }
    `
    const result = await getClient().request(query)
    return result.stores
  }

  export async function getShelves(storeId: number): Promise<IShelf[]> {
    const query = gql`
      query ($storeId: String!) {
        shelves(filter: { storeId: { operator: "eq", value: $storeId, type: "int" } }) {
          id
          positionX
          positionY
          positionZ
          width
          height
          depth
          orientationX
          orientationY
          orientationZ
          orientationW
          externalReferenceId
          cadPlanId
          shelfLayers {
            id
            shelfId
            level
            positionZ
            width
            height
            depth
          }
        }
      }
    `

    const variables = {
      storeId: storeId,
    }

    return (await await getClient().request(query, variables)).shelves
  }
}
