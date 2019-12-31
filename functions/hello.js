exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      msg: `Mr. Mime is the best Pokemon`,
      status: 100
    })
  };
  callback(undefined, response);
};