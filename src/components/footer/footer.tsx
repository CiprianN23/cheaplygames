import { component$} from '@builder.io/qwik';
import { BiTwitter } from '../icons/BiTwitter';
import { BiGithub } from '../icons/BiGithub';

export const Footer = component$(() => {
    return (
        <>
            <footer>
                <div class="footer-content">
                    <div>
                        <img src="/logo-no-background.svg" alt="logo" width={250} height={75} />
                    </div>
                    <p>Most cheap games.</p>
                    <div class="icons">
                        <a
                            href="https://twitter.com/cheaply_games"
                            aria-label="CheaplyGames twitter page"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <BiTwitter aria-label='CheaplyGames twitter page'/>
                        </a>
                        <a
                            href="https://github.com/CiprianN23/cheaplygames"
                            aria-label="CheaplyGames github public repository"
                            target="_blank"
                            id="github"
                            rel="noreferrer"
                        >
                            <BiGithub aria-label='CheaplyGames github public repository' />
                        </a>
                    </div>
                </div>
                <br />

                <div class="footer-bottom">
                    <p>
                        <a href="/policy">Privacy Policy</a> |<a href="/terms">Terms&Conditions</a>
                    </p>
                    <br />
                    <p class="footer-notice">
                        This website uses
                        <a
                            href="https://apidocs.cheapshark.com/"
                            aria-label="cheapshark API documentation"
                            target="_blank"
                            rel="noreferrer"
                        >
                            CheapShark API
                        </a>
                    </p>
                    <br />
                    <p class="footer-notice">
                        The prices listed on this site are correct to the best of our knowledge.
                        CheaplyGames offers no guarantee on accuracy or availability. Copyrights and
                        trademarks are the property of their respective owners. © 2022 CheaplyGames,
                        most cheap games! All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
});
