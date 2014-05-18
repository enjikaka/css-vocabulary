$(document).ready(function() {
  var vocab = [
    {
      'tokenName': 'comment',
      'humanName': 'Kommentar',
      'url': ''
    },
    {
      'tokenName': 'statement',
      'humanName': 'Del',
      'url': ''
    },
    {
      'tokenName': 'rule-set',
      'humanName': 'Regel',
      'url': ''
    },
    {
      'tokenName': 'at-rule',
      'humanName': 'Specialregel',
      'url': ''
    },
    {
      'tokenName': 'media-query',
      'humanName': 'Mediaquery',
      'url': ''
    },
    {
      'tokenName': 'media-query-list',
      'humanName': 'Villkor för mediaquery',
      'url': ''
    },

    {
      'tokenName': 'media-type',
      'humanName': 'Mediatyp',
      'url': ''
    },
    {
      'tokenName': 'expression',
      'humanName': 'Uttryck',
      'url': ''
    },
    {
      'tokenName': 'media-feature',
      'humanName': 'Medievärde',
      'url': ''
    },
    {
      'tokenName': 'block',
      'humanName': 'Block',
      'url': ''
    },
    {
      'tokenName': 'declaration-block',
      'humanName': 'Deklarationsblock',
      'url': ''
    },
    {
      'tokenName': 'selector',
      'humanName': 'Selektor',
      'url': ''
    },
    {
      'tokenName': 'simple-selector',
      'humanName': 'Enkel selektor',
      'url': ''
    },
    {
      'tokenName': 'type-selector',
      'humanName': 'Typselektor',
      'url': ''
    },
    {
      'tokenName': 'universal-selector',
      'humanName': 'Universalselektor',
      'url': ''
    },
    {
      'tokenName': 'id-selector',
      'humanName': 'ID-selektor',
      'url': ''
    },
    {
      'tokenName': 'class-selector',
      'humanName': 'Klass-selektor',
      'url': ''
    },
    {
      'tokenName': 'attribute-selector',
      'humanName': 'Attributselektor',
      'url': ''
    },
    {
      'tokenName': 'pseudo-class',
      'humanName': 'Pseudoklass',
      'url': ''
    },
    {
      'tokenName': 'pseudo-element',
      'humanName': 'Pseudo-element',
      'url': ''
    },
    {
      'tokenName': 'combinator',
      'humanName': 'Kombinationsselektor...',
      'url': ''
    },
    {
      'tokenName': 'descendant-combinator',
      'humanName': '...för alla underordnade element',
      'url': ''
    },
    {
      'tokenName': 'child-combinator',
      'humanName': '...för direkt underordnat element',
      'url': ''
    },
    {
      'tokenName': 'adjacent-sibling-combinator',
      'humanName': '...för första efterföljande syskonelement',
      'url': ''
    },
    {
      'tokenName': 'general-sibling-combinator',
      'humanName': '...för alla följande syskonelement',
      'url': ''
    },
    {
      'tokenName': 'declaration',
      'humanName': 'Deklaration',
      'url': ''
    },
    {
      'tokenName': 'property',
      'humanName': 'Egenskap',
      'url': ''
    },
    {
      'tokenName': 'value',
      'humanName': 'Värde',
      'url': ''
    },
    {
      'tokenName': 'function',
      'humanName': 'Funktion',
      'url': ''
    },
    {
      'tokenName': 'keyword',
      'humanName': 'Nyckelord',
      'url': ''
    },
    /*{
      'tokenName': 'identifier',
      'humanName': 'Identifier',
      'url': ''
    },*/
    {
      'tokenName': 'string',
      'humanName': 'Sträng',
      'url': ''
    },
    {
      'tokenName': 'url',
      'humanName': 'URL',
      'url': ''
    },
    {
      'tokenName': 'number',
      'humanName': 'Nummer',
      'url': ''
    },
    {
      'tokenName': 'percentage',
      'humanName': 'Procentenhet',
      'url': ''
    },
    {
      'tokenName': 'length',
      'humanName': 'Längd',
      'url': ''
    },
    {
      'tokenName': 'unit',
      'humanName': 'Enhet',
      'url': ''
    },
    {
      'tokenName': 'color',
      'humanName': 'Färg',
      'url': ''
    },
    {
      'tokenName': 'vendor-prefix',
      'humanName': 'Webbläsarprefix',
      'url': ''
    },
  ];

  //Build vocab list in the sidebar
  function buildVocabList (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].humanName;
      token = vocab[i].tokenName;
      $('.vocabList').append('<li class="'+token+'" tabindex="0">'+text+'</li>');
    }
  }
  buildVocabList(vocab);

  /*
    build css selectors that select:
    - all tokens in the app
    - tokens in css panel and
    - tokens in vocabList
  */
  function buildSelectors (obj) {
    var all = '';
    var css = '';
    var vocab = '';
    obj.forEach(function (item, i, obj) {
      var name = item.tokenName;
      all = all + '.' + name + ',';
      css = css + '.css .' + name + ',';
      vocab = vocab + '.vocabList .' + name + ',';
    });
    // Remove the trailing comma in each selector string
    all = all.slice(0, -1);
    css = css.slice(0, -1);
    vocab = vocab.slice(0, -1);
    return {'allTokens': all, 'cssTokens': css, 'vocabTokens': vocab};
  }
  var selectors = buildSelectors(vocab);

  $(selectors.cssTokens).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectors.cssTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectors.vocabTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.sidebar').addClass('focus');
    $('.content').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var $cssPals = $('.css .' + whatIsThis);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
  });

  $(selectors.allTokens).attr('tabindex', '0');
  //$('.vocabList .property').focus();

  key('up', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.prev().focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.next().focus();
    }
  });

  $('.sidebar-hide-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
