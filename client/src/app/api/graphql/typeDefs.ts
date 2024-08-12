const typeDefs = `#graphql
  input CharacterFilter{
    search: String!
    limit: Int
    offset: Int
    hasBounty: Boolean
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
    me: String!
    characters(filter: CharacterFilter): CharactersResponse
    devilFruits: [DevilFruit]
  }

`;

export default typeDefs;
