/**
 * Documentation tool module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.DocumentationTool = (function ($, NavigationMenu, JoubelUI, EventDispatcher) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-documentation-tool';
  var PAGES_CONTAINER = 'h5p-documentation-tool-page-container';
  var PAGE_INSTANCE = 'h5p-documentation-tool-page';
  var FOOTER = 'h5p-documentation-tool-footer';

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} DocumentationTool DocumentationTool instance
   */
  function DocumentationTool(params, id, extras) {
    var self = this;
    this.$ = $(this);
    this.id = id;

    this.extras = extras;

    // Set default behavior.
    this.params = $.extend({
      taskDescription: (this.extras.metadata && this.extras.metadata.title) ? this.extras.metadata.title : 'Documentation Tool',
      pagesList: [],
      l10n: {
        nextLabel: 'Next',
        previousLabel: 'Previous',
        closeLabel: 'Close'
      }
    }, params);

    if (params.taskDescription === undefined && params.navMenuLabel !== undefined) {
      this.params.taskDescription = params.navMenuLabel;
    }

    EventDispatcher.call(this);

    this.on('resize', self.resize, self);
  }

  DocumentationTool.prototype = Object.create(EventDispatcher.prototype);
  DocumentationTool.prototype.constructor = DocumentationTool;

  /**
   * Make a non-button element behave as a button. I.e handle enter and space
   * keydowns as click
   *
   * @param  {H5P.jQuery} $element The "button" element
   * @param  {Function} callback
   */
  DocumentationTool.handleButtonClick = function ($element, callback) {
    $element.click(function (event) {
      callback.call($(this), event);
    });
    $element.keydown(function (event) {
      // 32 - space, 13 - enter
      if ([32, 13].indexOf(event.which) !== -1) {
        event.preventDefault();
        callback.call($(this), event);
      }
    });
  };

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  DocumentationTool.prototype.attach = function ($container) {

    var self = this;
    this.pageInstances = [];
    this.currentPageIndex = 0;

    this.$inner = $container.addClass(MAIN_CONTAINER);

    this.$mainContent = $('<div/>', {
      'class': 'h5p-documentation-tool-main-content'
    }).appendTo(this.$inner);

    // Create pages
    var $pagesContainer = self.createPages().appendTo(this.$mainContent);
    self.$pagesArray = $pagesContainer.children();

    // Create navigation menu
    var navigationMenu = new NavigationMenu(self, this.params.taskDescription);
    navigationMenu.attach(this.$mainContent);

    if (this.$inner.children().length) {
      self.$pagesArray.eq(self.currentPageIndex).addClass('current');
    }

    this.navigationMenu = navigationMenu;

    self.resize();
  };

  /**
   * Creates the footer.
   * @returns {jQuery} $footer Footer element
   */
  DocumentationTool.prototype.createFooter = function (enablePrevious, enableNext) {
    var $footer = $('<div>', {
      'class': FOOTER
    });

    // Next page button
    this.createNavigationButton(1, enableNext).appendTo($footer);

    // Previous page button
    this.createNavigationButton(-1, enablePrevious).appendTo($footer);

    return $footer;
  };

  /**
   * Create navigation button
   * @param {Number} moveDirection An integer for how many pages the button will move, and in which direction
   * @returns {*}
   */
  DocumentationTool.prototype.createNavigationButton = function (moveDirection, enabled) {
    var self = this;
    var type = 'next';
    var navigationLabel = this.params.l10n.nextLabel;
    if (moveDirection === -1) {
      type = 'prev';
      navigationLabel = this.params.l10n.previousLabel;
    }

    var $navButton = $('<div>', {
      'class': 'joubel-simple-rounded-button h5p-documentation-tool-nav-button ' + type,
      'aria-label': navigationLabel,
      'title': navigationLabel,
      'aria-disabled': !enabled,
      'tabindex': enabled ? 0 : undefined,
      'html': '<span class="joubel-simple-rounded-button-text"></span>'
    });

    DocumentationTool.handleButtonClick($navButton, function (event) {
      self.movePage(self.currentPageIndex + moveDirection, event);
    });

    return $navButton;
  };

  /**
   * Populate container and array with page instances.
   * @returns {jQuery} Container
   */
  DocumentationTool.prototype.createPages = function () {
    var self = this;

    var $pagesContainer = $('<div>', {
      'class': PAGES_CONTAINER
    });

    var numPages = this.params.pagesList.length;

    for (var i = 0; i < numPages; i++) {
      var page = this.params.pagesList[i];

      var $pageInstance = $('<div>', {
        'class': PAGE_INSTANCE
      }).appendTo($pagesContainer);

      var singlePage = H5P.newRunnable(page, self.id, undefined, undefined, {
        parent: self // Set the parent for xapi context
      });
      if (singlePage.libraryInfo.machineName === 'H5P.DocumentExportPage') {
        singlePage.setExportTitle(self.params.taskDescription);
        singlePage.setSumbitEnabled(H5PIntegration.reportingIsEnabled);
      }
      singlePage.attach($pageInstance);
      self.createFooter(i !== 0, i < (numPages - 1)).appendTo($pageInstance);
      self.pageInstances.push(singlePage);

      singlePage.on('resize', function () {
        self.trigger('resize');
      });

      singlePage.on('export-page-opened', self.hide, self);
      singlePage.on('export-page-closed', self.show, self);
      singlePage.on('open-help-dialog', self.showHelpDialog, self);
      singlePage.on('submitted', function () {
        self.triggerAnsweredEvents();
        /*
         * There's no score attached to Documentation Tool, but
         * it may be used in Column which needs a score that's not null.
         */
        var completedEvent = self.createXAPIEventTemplate('completed');
        completedEvent.setScoredResult(0, 0);
        self.trigger(completedEvent);
      });
    }

    return $pagesContainer;
  };

  /**
   * Remove tabindex for main content.
   */
  DocumentationTool.prototype.untabalize = function () {
    // Make all other elements in container not tabbable. When dialog is open,
    // it's like the elements behind does not exist.
    this.$tabbables = this.$mainContent.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').each(function () {
      var $tabbable = $(this);
      // Store current tabindex, so we can set it back when dialog closes
      $tabbable.data('tabindex', $tabbable.attr('tabindex'));
      // Make it non tabbable
      $tabbable.attr('tabindex', '-1');
    });

    // Make sure container and all content within it is not seen by screenreaders
    this.$mainContent.attr('aria-hidden', true);
  };

  /**
   * Set back tabindex for main container.
   */
  DocumentationTool.prototype.tabalize = function () {
    if (this.$tabbables) {
      this.$tabbables.each(function () {
        var $element = $(this);
        var tabindex = $element.data('tabindex');
        if (tabindex !== undefined) {
          $element.attr('tabindex', tabindex);
          $element.removeData('tabindex');
        }
        else {
          $element.removeAttr('tabindex');
        }
      });
    }

    this.$mainContent.removeAttr('aria-hidden');
  };

  /**
   * Show help dialog
   *
   * @param  {Object} event
   */
  DocumentationTool.prototype.showHelpDialog = function (event) {
    var self = this;

    self.untabalize();

    var helpTextDialog = new H5P.JoubelUI.createHelpTextDialog(event.data.title, event.data.helpText, self.params.l10n.closeLabel);

    // Handle closing of the dialog
    helpTextDialog.on('closed', function () {
      // Set focus back on the page
      self.tabalize();
      self.getCurrentPage().$helpButton.focus();
    });

    this.$inner.append(helpTextDialog.getElement());

    helpTextDialog.focus();
  };

  /**
   * Hide me
   */
  DocumentationTool.prototype.hide = function () {
    this.$mainContent.addClass('hidden');
  };

  /**
   * Show me
   */
  DocumentationTool.prototype.show = function () {
    this.$mainContent.removeClass('hidden');
  };

  /**
   * Moves the documentation tool to the specified page
   * @param {Number} toPageIndex Move to this page index
   */
  DocumentationTool.prototype.movePage = function (toPageIndex) {
    var self = this;

    // Invalid value
    if ((toPageIndex + 1 > this.$pagesArray.length) || (toPageIndex < 0)) {
      return;
    }

    var assessmentGoals = self.getGoalAssessments(self.pageInstances);
    var newGoals = self.getGoals(self.pageInstances);
    assessmentGoals.forEach(function (assessmentPage) {
      newGoals = self.mergeGoals(newGoals, assessmentPage);
    });

    // Update page depending on what page type it is
    self.updatePage(toPageIndex, newGoals);

    this.$pagesArray.eq(this.currentPageIndex).removeClass('current');
    this.currentPageIndex = toPageIndex;
    this.$pagesArray.eq(this.currentPageIndex).addClass('current');

    // Update navigation menu
    this.navigationMenu.updateNavigationMenu(this.currentPageIndex);

    // Scroll to top
    this.scrollToTop();

    // Set focus on the new page after navigating to it
    var pageInstance = self.pageInstances[toPageIndex];
    if (pageInstance.focus) {
      // Trigger focus on text tick
      setTimeout(function () {
        pageInstance.focus();
      }, 0);
    }

    // Trigger xAPI event
    var progressedEvent = self.createXAPIEventTemplate('progressed');
    progressedEvent.data.statement.object.definition.extensions['http://id.tincanapi.com/extension/ending-point'] = toPageIndex;
    self.trigger(progressedEvent);

    self.trigger('resize');
  };

  /**
   * Get current page instance
   * @return {Object} The page instance
   */
  DocumentationTool.prototype.getCurrentPage = function () {
    return this.pageInstances[this.currentPageIndex];
  };

  /**
   * Scroll to top if changing page and below y position is above threshold
   */
  DocumentationTool.prototype.scrollToTop = function () {
    var staticScrollToTopPadding = 90;
    var yPositionThreshold = 75;

    // Scroll to top of content type if above y threshold
    if ($(window).scrollTop() - $(this.$inner).offset().top > yPositionThreshold) {
      $(window).scrollTop(this.$inner.offset().top - staticScrollToTopPadding);
    }
  };

  /**
   * Update page depending on what type of page it is
   * @param {Object} toPageIndex Page object that will be updated
   * @param {Array} newGoals Array containing updated goals
   */
  DocumentationTool.prototype.updatePage = function (toPageIndex, newGoals) {
    var self = this;
    var pageInstance = self.pageInstances[toPageIndex];

    if (pageInstance.libraryInfo.machineName === 'H5P.GoalsAssessmentPage') {
      self.setGoals(self.pageInstances, newGoals);
    }
    else if (pageInstance.libraryInfo.machineName === 'H5P.DocumentExportPage') {

      // Check if all required input fields are filled
      var allRequiredInputsAreFilled = self.checkIfAllRequiredInputsAreFilled(self.pageInstances);
      self.setRequiredInputsFilled(self.pageInstances, allRequiredInputsAreFilled);

      // Get all input fields, goals and goal assessments
      var allInputs = self.getDocumentExportInputs(self.pageInstances);
      self.setDocumentExportOutputs(self.pageInstances, allInputs);
      self.setDocumentExportGoals(self.pageInstances, newGoals);
    }
  };

  /**
   * Merge assessment goals and newly created goals
   *
   * @returns {Array} newGoals Merged goals list with updated assessments
   */
  DocumentationTool.prototype.mergeGoals = function (newGoals, assessmentGoals) {
    // Not an assessment page
    if (!assessmentGoals.length) {
      return newGoals;
    }
    newGoals.forEach(function (goalPage, pageIndex) {
      goalPage.forEach(function (goalInstance) {
        var result = $.grep(assessmentGoals[pageIndex], function (assessmentInstance) {
          return assessmentInstance.getUniqueId() === goalInstance.getUniqueId();
        });
        if (result.length) {
          goalInstance.goalAnswer(result[0].goalAnswer());
        }
      });
    });
    return newGoals;
  };

  /**
   * Gets goals assessments from all goals assessment pages and returns update goals list.
   *
   * @param {Array} pageInstances Array of pages contained within the documentation tool
   * @returns {Array} goals Updated goals list
   */
  DocumentationTool.prototype.getGoalAssessments = function (pageInstances) {
    var goals = [];
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.GoalsAssessmentPage') {
        goals.push(page.getAssessedGoals());
      }
    });
    return goals;
  };

  /**
   * Retrieves all input fields from the documentation tool
   * @returns {Array} inputArray Array containing all inputs of the documentation tool
   */
  DocumentationTool.prototype.getDocumentExportInputs = function (pageInstances) {
    var inputArray = [];
    pageInstances.forEach(function (page) {
      var pageInstanceInput = [];
      var title = '';
      if (page.libraryInfo.machineName === 'H5P.StandardPage') {
        pageInstanceInput = page.getInputArray();
        title = page.getTitle();
      }
      inputArray.push({inputArray: pageInstanceInput, title: title});
    });

    return inputArray;
  };

  /**
   * Checks if all required inputs are filled
   * @returns {boolean} True if all required inputs are filled
   */
  DocumentationTool.prototype.checkIfAllRequiredInputsAreFilled = function (pageInstances) {
    var allRequiredInputsAreFilled = true;
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.StandardPage') {
        if (!page.requiredInputsIsFilled()) {
          allRequiredInputsAreFilled = false;
        }
      }
    });

    return allRequiredInputsAreFilled;
  };

  /**
   * Gets goals from all goal pages and returns updated goals list.
   *
   * @param {Array} pageInstances Array containing all pages.
   * @returns {Array} goals Updated goals list.
   */
  DocumentationTool.prototype.getGoals = function (pageInstances) {
    var goals = [];
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.GoalsPage') {
        goals.push(page.getGoals());
      }
    });
    return goals;
  };

  /**
   * Insert goals to all goal assessment pages.
   * @param {Array} pageInstances Page instances
   * @param {Array} goals Array of goals.
   */
  DocumentationTool.prototype.setGoals = function (pageInstances, goals) {
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.GoalsAssessmentPage') {
        page.updateAssessmentGoals(goals);
      }
    });
  };

  /**
   * Sets the output for all document export pages
   * @param {Array} inputs Array of input strings
   */
  DocumentationTool.prototype.setDocumentExportOutputs  = function (pageInstances, inputs) {
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.DocumentExportPage') {
        page.updateOutputFields(inputs);
      }
    });
  };

  /**
   * Sets the output for all document export pages
   * @param {Array} inputs Array of input strings
   */
  DocumentationTool.prototype.setDocumentExportGoals  = function (pageInstances, newGoals) {
    var assessmentPageTitle = '';
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.GoalsAssessmentPage') {
        assessmentPageTitle = page.getTitle();
      }
    });

    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.DocumentExportPage') {
        page.updateExportableGoals({inputArray: newGoals, title: assessmentPageTitle});
      }
    });
  };

  /**
   * Sets the required inputs filled boolean in all document export pages
   * @param {object[]} pageInstances All page instances.
   */
  DocumentationTool.prototype.setRequiredInputsFilled  = function (pageInstances) {
    // Get titles of pages that contain required fields that are not filled
    const titlesPagesIncomplete = this.getIncompletePages().map(function (page) {
      return page.getTitle();
    });

    // Update document export page
    pageInstances.forEach(function (page) {
      if (page.libraryInfo.machineName === 'H5P.DocumentExportPage') {
        page.updateRequiredInputsFilled(titlesPagesIncomplete);
      }
      else if (page.libraryInfo.machineName === 'H5P.StandardPage') {
        page.markRequiredInputFields();
      }
    });
  };

  /**
   * Get page instances with required fields that are not filled.
   * @return {object[]} Page instances with required fields that are not filled.
   */
  DocumentationTool.prototype.getIncompletePages = function () {
    return this.pageInstances.filter(function (page) {
      return page.libraryInfo.machineName === 'H5P.StandardPage' &&
        !page.requiredInputsIsFilled();
    });
  };

  /**
   * Resize function for responsiveness.
   */
  DocumentationTool.prototype.resize = function () {
    // Width calculations
    this.adjustDocumentationToolWidth();
    this.adjustNavBarHeight();
  };

  /**
   * Adjusts navigation menu minimum height
   */
  DocumentationTool.prototype.adjustNavBarHeight = function () {
    var headerHeight = this.navigationMenu.$navigationMenuHeader.get(0).getBoundingClientRect().height +
        parseFloat(this.navigationMenu.$navigationMenuHeader.css('margin-top')) +
        parseFloat(this.navigationMenu.$navigationMenuHeader.css('margin-bottom'));
    var entriesHeight = this.navigationMenu.$navigationMenuEntries.get(0).getBoundingClientRect().height;
    var minHeight = headerHeight + entriesHeight;
    this.$mainContent.css('min-height', minHeight + 'px');
  };

  /**
   * Resizes navigation menu depending on task width
   */
  DocumentationTool.prototype.adjustDocumentationToolWidth = function () {
    // Show responsive design when width relative to font size is less than static threshold
    var staticResponsiveLayoutThreshold = 40;
    var relativeWidthOfContainer = this.$inner.width() / parseInt(this.$inner.css('font-size'), 10);
    var responsiveLayoutRequirement = relativeWidthOfContainer < staticResponsiveLayoutThreshold;
    this.navigationMenu.setResponsiveLayout(responsiveLayoutRequirement);
  };

  /**
   * Triggers an 'answered' xAPI event for all inputs
   * We do this because we can only trigger answered events once per submission
   * therefore, we have to trigger all of them simultaneously with one function.
   */
  DocumentationTool.prototype.triggerAnsweredEvents = function () {
    this.pageInstances.forEach(function (page) {
      if (page.triggerAnsweredEvents) {
        page.triggerAnsweredEvents();
      }
    });
  };

  /**
   * Generate xAPI object definition used in xAPI statements.
   * @return {Object}
   */
  DocumentationTool.prototype.getxAPIDefinition = function () {
    var definition = {};

    definition.interactionType = 'compound';
    definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
    definition.description = {
      'en-US': ''
    };
    definition.extensions = {
      'https://h5p.org/x-api/h5p-machine-name': 'H5P.DocumentationTool'
    };

    return definition;
  };

  /**
   * Add the question itself to the definition part of an xAPIEvent
   */
  DocumentationTool.prototype.addQuestionToXAPI = function (xAPIEvent) {
    var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    $.extend(definition, this.getxAPIDefinition());
  };

  /**
   * Get xAPI data from sub content types
   *
   * @param {Object} metaContentType
   * @returns {array}
   */
  DocumentationTool.prototype.getXAPIDataFromChildren = function () {

    var children = [];

    this.pageInstances.forEach(function (page) {
      if (page.getXAPIData) {
        children.push(page.getXAPIData());
      }
    });

    return children;
  };

  /**
   * Get xAPI data.
   * Contract used by report rendering engine.
   *
   * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
   */
  DocumentationTool.prototype.getXAPIData = function () {
    var xAPIEvent = this.createXAPIEventTemplate('answered');
    this.addQuestionToXAPI(xAPIEvent);
    return {
      statement: xAPIEvent.data.statement,
      children: this.getXAPIDataFromChildren()
    };
  };

  /**
   * Get the content type title.
   *
   * @return {string} title.
   */
  DocumentationTool.prototype.getTitle = function () {
    return H5P.createTitle((this.extras.metadata && this.extras.metadata.title) ? this.extras.metadata.title : 'Documentation Tool');
  };

  return DocumentationTool;
}(H5P.jQuery, H5P.DocumentationTool.NavigationMenu, H5P.JoubelUI, H5P.EventDispatcher));
