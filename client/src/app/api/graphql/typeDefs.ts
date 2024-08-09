const typeDefs = `#graphql
  input CharacterInput{
    name: String!
  }


  type Character{
    name: String!
    description: String!
    devilFruit: [DevilFruit!]
  }

  type DevilFruit{
    name: String!
    description: String!
    type: [DevilFruitType!]
  }

  type DevilFruitType{
    type: String!
    subType: String
  }

  type Query {
    me: String!
    characters: [Character]
    devilFruits: [DevilFruit]
  }

`;

export default typeDefs;
