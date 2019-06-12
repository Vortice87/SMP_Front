'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sourcing-manager-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' : 'data-target="#xs-components-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' :
                                            'id="xs-components-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' }>
                                            <li class="link">
                                                <a href="components/AdministrationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CandidateDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfigurationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAreaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewAreaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewdetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewdetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadCandidateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadCandidateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' : 'data-target="#xs-injectables-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' :
                                        'id="xs-injectables-links-module-AppModule-224578b06cdf47822fc528e3311f2dc4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CandidateService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CandidateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ComunicationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ComunicationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConfigurationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ConfigurationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RequestService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserAccountDTOService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserAccountDTOService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Area.html" data-type="entity-link">Area</a>
                            </li>
                            <li class="link">
                                <a href="classes/Candidate.html" data-type="entity-link">Candidate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Configuration.html" data-type="entity-link">Configuration</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateUtils.html" data-type="entity-link">DateUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/Detalles.html" data-type="entity-link">Detalles</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentData.html" data-type="entity-link">DocumentData</a>
                            </li>
                            <li class="link">
                                <a href="classes/IOUtils.html" data-type="entity-link">IOUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReqTechnical.html" data-type="entity-link">ReqTechnical</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestDTO.html" data-type="entity-link">RequestDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Requester.html" data-type="entity-link">Requester</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestFilter.html" data-type="entity-link">RequestFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionUtils.html" data-type="entity-link">SessionUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAccountDTO.html" data-type="entity-link">UserAccountDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidateService.html" data-type="entity-link">CandidateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComunicationService.html" data-type="entity-link">ComunicationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigurationService.html" data-type="entity-link">ConfigurationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link">RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAccountDTOService.html" data-type="entity-link">UserAccountDTOService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});