var REWRITE_EXT = [".jade", "_page_load"];
var LOCATION = 'desktop/'

module.exports = function(app){
  // index
  app.get('/', default_render);
  app.get('/index', default_render);
  app.get('/index.jade', default_render);
  app.get('/index.html', default_render);
  
  // no javascript pages
  app.get('/no_script', render_no_script);
  
  // initialization loads (AJAX)
  app.get('/index'+REWRITE_EXT[1], render_get_page);//loaded at initialization stage
  app.get('/' + LOCATION + 'headers', render_get_page);
  
  // regular page loads
  app.get('/test', function default_render(req, res){
    res.render('test/index', {layout: 'test/index.jade'});
  });
  app.get('/home', default_render);
  app.get('/demos', default_render);
  app.get('/experience', default_render);
  app.get('/skills', default_render);
  app.get('/blog', default_render);
  
  // ajax page loads
  app.get('/home'+REWRITE_EXT[1], render_get_page);
  app.get('/demos'+REWRITE_EXT[1], render_get_page);
  app.get('/experience'+REWRITE_EXT[1], render_get_page);
  app.get('/skills'+REWRITE_EXT[1], render_get_page);
  app.get('/blog'+REWRITE_EXT[1], render_get_page);
  app.get('/blog/August_2011.html', function (req, res){
    res.render(req, {prev_loaded: true });
  });
  
  // gzipping main js file
  app.get('/javascripts/min.js', function (req, res, next) {
    res.header('Content-Encoding', 'gzip');
    req.url = req.url + '.gz';
    next();
  });
  app.get('/javascripts/jquery.window_tiles.min.js', function (req, res, next) {
    res.header('Content-Encoding', 'gzip');
    req.url = req.url + '.gz';
    next();
  });
}

// title found in constants, marked as not previously loaded
function default_render(req, res){
  res.render(LOCATION + "index", { title: constant.page_text.home.title, prev_loaded: false, desktop: true});
}

// Uses the url sent in to determine the page to load. All invalid extensions are replaced. Also the title is generated
// from the current pages constant page.
function render_get_page(req, res){
  // Whatever page is passed in the system loads
  if (req.url == "/") req.url = "/" + constant.pages[0].toLowerCase();
  constant.to_load = req.url.substring(1);//remove /

  // page rewrites
  constant.to_load = constant.to_load.replace("undefined", "").replace(REWRITE_EXT[1], REWRITE_EXT[0]);
  var title = constant.page_text[constant.to_load.replace(".jade", "").replace("blog/index","blog")];
  if (title)
    var title = title.title;
    
  // append desktop location if not already there
  if (constant.to_load.search(LOCATION) < 0)
    constant.to_load = LOCATION + constant.to_load;
  
  res.render(constant.to_load, { title: title, prev_loaded: true});
}

// Gets the current page from the url and
function render_no_script(req, res){
  var cur_page = 'home';
  var id = 0;
  
  // parse query to send correct params
  if(Object.keys(req.query).length !== 0){//ECMA 1.8.5+ only
    cur_page = req.query.link;
    id = req.query.id;
  }
  
  res.render("no_script", { title: constant.page_text.home.title, layout: false, cur_page: cur_page, id: id});
}

//ಠ_ಠ
