import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './navbar.css?inline';

export const NavBar = component$(() => {
    useStylesScoped$(styles);

    const isMenuActive = useSignal(false);

    const navItems = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Browse', path: '/browse' },
        { id: 3, title: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <header class="primary-header flex">
                <div>
                    <a href="/">
                        <img
                            src="/logo-no-background.svg"
                            alt="logo"
                            class="logo"
                            width={150}
                            height={50}
                        />
                    </a>
                </div>

                <button
                    class="mobile-nav-toggle"
                    type="button"
                    aria-label="Menu"
                    aria-controls="primary-navigation"
                    aria-expanded={isMenuActive.value}
                    onClick$={() => isMenuActive.value = !isMenuActive.value}
                ></button>

                <nav>
                    <ul id="primary-navigation" class="primary-navigation flex" data-visible={`${isMenuActive.value}`}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a href={item.path}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
});
