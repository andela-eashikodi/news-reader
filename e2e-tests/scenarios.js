'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should not redirect elsewhere when intially loaded', function() {
    expect(browser.getLocationAbsUrl()).toBe('http://localhost:8000/index.html');
  });

  describe('header', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should render actual header title', function() {
      expect(element.all(by.tagName('header')).getText()).toMatch('NEWS');
    });
  });

  describe('feedsite headline', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should display name of current feed site', function() {
      var search = element(by.model('site'));
      var buttn = element.all(by.id('submitButton'));
      var feedname = element.all(by.id('headline'));

      search.sendKeys('vanguardngr.com');
      buttn.click().then(function(res){
        expect(feedname.getText()).toMatch('vanguard');
      });

      var sort = element(by.model('find'));
      var feedList = element.all(by.repeater('feed in feeds'));

      sort.sendKeys('gdgdgdhhshhsgshjd');
      expect(feedList.count()).toBe(0);
    });
  });
});
