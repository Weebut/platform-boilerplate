module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
<<<<<<< HEAD
  url: env('DOMAIN'),
=======
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
});
