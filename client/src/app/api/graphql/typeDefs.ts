const typeDefs = `#graphql
  input CharacterFilter{
    search: String
    limit: Int
    page: Int
    hasBounty: Boolean
  }

  enum DevilFruitTypes{
    PARAMECIA
    ZOAN
    LOGIA
  }

  input DevilFruitFilter{
    limit: Int
    page: Int
    type: DevilFruitTypes
  }

  type Character{
    name: String!
    description: String!
    image: String!
    devilFruits: [DevilFruit!]
    origin: String
    birthday: String
    bloodType: String
    bounty: String
    occupations: String
    affiliations: String
  }

  type CharactersResponse{
    info: Info!
    results: [Character!]
  }

  type DevilFruitsResponse{
    info: Info!
    results: [DevilFruit!]
  }

  type Info{
    count: Int!
    pages: Int!
    next: String
    prev: String
  }

  type DevilFruit{
    name: String!
    description: String!
    image: String!
    types: [DevilFruitType!]
  }

  type DevilFruitType{
    type: String!
    subType: String
  }

  type Query {
    characters(filter: CharacterFilter): CharactersResponse
    devilFruits(filter: DevilFruitFilter): DevilFruitsResponse
  }

`;

export default typeDefs;
