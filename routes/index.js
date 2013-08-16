var REWRITE_EXT = [".jade", "_page_load_desktop"],
    FILE_TYPE = '.jade',
    KEYWORD = '_angular';

module.exports = function(app){
    app.get('/', render_get_page);
    app.get(/index/, render_get_page);

    // Angular
    ['/home', '/skills', '/experience', '/demos', '/blog'].forEach(function (url){
        app.get(url, index_render);
        app.get(url+KEYWORD, render_angular_page);
    });
    
    // No javascript pages
    app.get('/no_script', render_no_script);
    
    // Test page loads
    app.get('/test', function default_render(req, res){
        res.render('test/index');
    });
  
    // Gzipping main js file for all interfaces if the file is minified
    app.get(/.js/, function (req, res, next) {    
        if (req.url.search('min.js') > 0){
            res.header('Content-Encoding', 'gzip');
            req.url = req.url + '.gz';
        }
        
        next();
    });
}

// function render_angular_page_full_load(req, res){

// }

function render_angular_page(req, res){
    var title = req.url.split('/')[1].replace(KEYWORD, '');

    res.render(title + FILE_TYPE, {title: title});
}

function index_render(req, res){
    res.render(get_location(req) + "index", { title: constant.page_text.home.title });
}

function render_get_page(req, res){
    // Whatever page is passed in the system loads
    constant.to_load = req.url.substring(1).split('?')[0];//remove / and all queries

    // Title is derived from constants, if this is an index page load make title blank
    var title = '';
    if (constant.page_text[constant.to_load])
        var title = constant.page_text[constant.to_load].title;
        
    var path = get_location(req) +  constant.to_load + '/index';
    if (path === '/index')
        path = 'index';
    if (path.search('/index/index') > -1)
        path = path.split('/index')[0];
        
    // If no data is found load index the right page will be loaded later
    if (get_location(req) === '')
        path = 'index';
    res.render(path, { title: title});
}

function render_no_script(req, res){
    var cur_page = 'home';
    var id = 0;
    
    // Parse query to send correct params
    if(Object.keys(req.query).length !== 0){
        cur_page = req.query.link;
        id = req.query.id;
    }
    
    // Retrieve contents of the page to load then insert it into the loading page
    res.render('desktop/' + cur_page, { title: constant.page_text.home.title, cur_page: cur_page, id: id, no_script: true}, function(err, html){
        res.render('menu_no_script', { title: constant.page_text.home.title, cur_page: cur_page, id: id, page: html});
    });
}

// Gets the location from determining the type of client, if no type can be found the top level location is used
function get_location(req){
    if (typeof req.params.mode !== 'undefined' && req.params.mode != null)
        return req.params.mode + "/";
    if (typeof req.query.mode !== 'undefined' && req.query.mode != null)
        return req.query.mode + "/";
    return '';
}

//ಠ_ಠ
