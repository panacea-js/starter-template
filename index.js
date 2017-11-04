import { registerServicesFromFile } from '@/utils/DIContainer'
registerServicesFromFile('src/default.services')

const {
  makeExecutableSchema,
  dbModels,
  graphiqlExpress,
  graphqlExpress,
  bodyParser,
  express,
  voyagerMiddleware,
  graphQLTypeDefinitions,
  graphQLResolvers,
  hooks,
  log
} = DI.container

// Load application level hooks.
hooks.loadFromDirectories(['./admin/hooks'])

graphQLTypeDefinitions().then(typeDefs => {

  const resolvers = graphQLResolvers()

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: dbModels() }));

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

  app.listen(3000);

  hooks.logAvailableHooks()

}).catch(error => log.error(`Server not started: ${error}`))
