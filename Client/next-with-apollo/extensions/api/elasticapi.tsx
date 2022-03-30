import elastic from "elasticsearch";

export const elasticSearchSongs = async (_query: string) => {
  const client = new elastic.Client({
    host: "http://164.92.167.169:9200",
  });
  const result = await client.search({
    index: "koinoniamusicdbsongs",
    body: {
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "name.extract_number": {
                  value: _query.replace(/[^0-9]/g, "") + "*",
                  boost: 1,
                },
              },
            },
            {
              wildcard: {
                name: {
                  value: "*" + _query + "*",
                  boost: 5,
                },
              },
            },
            {
              query_string: {
                query:
                  _query.replaceAll(/^[^a-z0-9].*?(?=[a-z0-9])/gim, "") +
                  (_query.length > 0 ? "~" : ""),
                fuzziness: "AUTO:0,5",
                fuzzy_max_expansions: 70,
                fuzzy_transpositions: true,
                default_field: "name",
              },
            },
          ],
        },
      },
    },
  });
  return result.hits.hits
    .sort((a, b) => b._score - a._score)
    .map((hit) => hit._id);
};

export const elasticSearchPlaylists = async (_query: string) => {
  const client = new elastic.Client({
    host: "http://164.92.167.169:9200",
  });
  const result = await client.search({
    index: "koinoniamusicdbplaylists",
    body: {
      stored_fields: [],
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "name.extract_number": {
                  value: _query.replace(/[^0-9]/g, "") + "*",
                  boost: 1,
                },
              },
            },
            {
              wildcard: {
                name: {
                  value: "*" + _query + "*",
                  boost: 5,
                },
              },
            },
            {
              query_string: {
                query:
                  _query.replaceAll(/^[^a-z0-9].*?(?=[a-z0-9])/gim, '') +
                  (_query.length > 0 ? "~" : ""),
                fuzziness: "AUTO:0,5",
                fuzzy_max_expansions: 70,
                fuzzy_transpositions: true,
                fields: ["name", "description"],
              },
            },
          ],
        },
      },
    },
  });
  return result.hits.hits.map((hit) => hit._id);
};
