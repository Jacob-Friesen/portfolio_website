var REWRITE_EXT = [".jade", "_page_load_desktop"];

module.exports = function(app){
    // website entry
    app.get('/', render_get_page);
    app.get('/index', render_get_page);
    app.get('/index.jade', render_get_page);
    app.get('/index.html', render_get_page);
    app.get('/home', render_get_page);
    app.get('/demos', render_get_page);
    app.get('/experience', render_get_page);
    app.get('/skills', render_get_page);
    app.get('/blog', render_get_page);
    
    // ajax page loads
    app.post('/index', index_render);
    app.post('/home', render_post_page);
    app.post('/demos', render_post_page);
    app.post('/experience', render_post_page);
    app.post('/skills', render_post_page);
    app.post('/blog', render_post_page);
    
    // no javascript pages
    app.get('/no_script', render_no_script);
    
    // test page loads
    app.get('/test', function default_render(req, res){
        res.render('test/index', {layout: 'test/index.jade'});
    });
  
    // gzipping main js file for all interfaces
    app.get('/javascripts/desktop/min.js', function (req, res, next) {
        res.header('Content-Encoding', 'gzip');
        req.url = req.url + '.gz';
        next();
    });
    app.get('/javascripts/mobile/min.js', function (req, res, next) {
        res.header('Content-Encoding', 'gzip');
        req.url = req.url + '.gz';
        next();
    });
}

function index_render(req, res){
    res.render(get_location(req) + "index", { title: constant.page_text.home.title, prev_loaded: true });
}

function render_get_page(req, res){
    // Whatever page is passed in the system loads
    if (req.url == "/") req.url = "/" + constant.pages[0].toLowerCase();
    constant.to_load = req.url.substring(1);//remove /
    
    // title is derived from constants, if this is an index page load make title blank
    var title = '';
    if (constant.page_text[constant.to_load])
        var title = constant.page_text[constant.to_load].title;
    
    res.render(get_location(req) + 'index', { title: title, prev_loaded: false});
}

function render_post_page(req, res){
    res.render(get_location(req) + req.url.substring(1) + "/index", { title: constant.title, prev_loaded: true });
}

function render_no_script(req, res){
    var cur_page = 'home';
    var id = 0;
    
    // parse query to send correct params
    if(Object.keys(req.query).length !== 0){
        cur_page = req.query.link;
        id = req.query.id;
    }
    
    res.render("no_script", { title: constant.page_text.home.title, layout: false, cur_page: cur_page, id: id});
}


//Gets the location from determining the type of client, if no type can be found the top level location is used
function get_location(req){
    if (typeof req.body.mode !== 'undefined' && req.body.mode != null)
        return req.body.mode + "/";
    return '';
}

//ಠ_ಠ
