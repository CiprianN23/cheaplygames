import { component$} from '@builder.io/qwik';
import { BiTwitter } from '../icons/BiTwitter';
import { BiGithub } from '../icons/BiGithub';
import { Link } from '@builder.io/qwik-city';

export const Footer = component$(() => {
    const navItems = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Browse', path: '/browse' },
        { id: 3, title: 'Contact', path: '/contact' },
        { id: 4, title: 'Privacy Policy', path: '/privacy' },
        { id: 5, title: 'Terms & Conditions', path: '/terms' },
    ];

    return (
        <>
            <footer class="padding:2em_0 margin:2em_0_0_0 text-align:center display:flex flex-direction:column align-items:center background-color:$background-lighten-10">
                <div class="display:flex [a]{padding:0_1em_1em;color:$text}">
                    <a
                        href="https://twitter.com/cheaply_games"
                        aria-label="CheaplyGames twitter page"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <BiTwitter class="width:1.5em height:1.5em" aria-label='CheaplyGames twitter page'/>
                    </a>
                    <a
                        href="https://github.com/CiprianN23/cheaplygames"
                        aria-label="CheaplyGames github public repository"
                        target="_blank"
                        id="github"
                        rel="noreferrer"
                    >
                        <BiGithub class="width:1.5em height:1.5em" aria-label='CheaplyGames github public repository' />
                    </a>
                </div>
                <br />

                <div class="font-size:$fontSize300">
                    <ul class="padding:1em list-style-type:none [a]{color:$text;} minw40rem:display:flex minw40rem:justify-content:space-evenly">
                        {navItems.map((item) => (
                            <li class="padding:0.5em_0" key={item.id}>
                                <Link href={item.path}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <p>
                        This website uses&nbsp;
                        <a  class='color:$text'
                            href="https://apidocs.cheapshark.com/"
                            aria-label="cheapshark API documentation"
                            target="_blank"
                            rel="noreferrer"
                        >
                            CheapShark API
                        </a>
                    </p>
                    <br />
                    <p class="font-size:$fontSize200">
                        The prices listed on this site are correct to the best of our knowledge.
                        CheaplyGames offers no guarantee on accuracy or availability. Copyrights and
                        trademarks are the property of their respective owners.
                    </p>
                    <br />
                    <p class="font-size:$fontSize200">© {new Date().getFullYear()} CheaplyGames, most cheap games!</p>
                    <p class="font-size:$fontSize200">All rights reserved.</p>
                </div>
            </footer>
        </>
    );
});
