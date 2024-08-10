const typeDefs = `#graphql
  input CharacterInput{
    name: String!
  }


  type Character{
    name: String!
    description: String!
    image: String!
    devilFruits: [DevilFruit!]
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
    characters: [Character]
    devilFruits: [DevilFruit]
  }

`;

export default typeDefs;
