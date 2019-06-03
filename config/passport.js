
// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:3000/auth/bnet/callback",
    region: "us"
  }, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));
  
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  app.get('/auth/bnet',
      passport.authenticate('bnet'));
   
  app.get('/auth/bnet/callback',
      passport.authenticate('bnet', { failureRedirect: '/' }),
      function(req, res){
          res.redirect(
                "/"
            );
      });
  
  