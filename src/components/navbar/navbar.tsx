import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const NavBar = component$(() => {
    const isMenuActive = useSignal(false);

    const navItems = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Browse', path: '/browse' },
        { id: 3, title: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <header class="display:flex gap:1rem align-items:center justify-content:space-between">
                <div>
                    <img src="" alt="logo" width={150} height={50} class="margin:2rem" />
                </div>

                <button
                    class="color:$text display:none border:0 maxw35em:display:block maxw35em:background-color:transparent maxw35em:background-image:url(/menu.svg) maxw35em:background-repeat:no-repeat maxw35em:position:absolute maxw35em:z-index:9999 maxw35em:width:2rem maxw35em:aspect-ratio:1 maxw35em:top:2rem maxw35em:right:2rem"
                    aria-controls="primary-navigation"
                    aria-expanded={`${isMenuActive.value}`}
                    onClick$={() => (isMenuActive.value = !isMenuActive.value)}
                >
                    <span class="sr-only">Menu</span>
                </button>

                <nav class="">
                    <ul
                        class="display:flex gap:1rem list-style:none background:$background maxw35em:gap:3em maxw35em:position:fixed maxw35em:z-index:1000 maxw35em:inset:0_0_0_30%  maxw35em:flex-direction:column maxw35em:padding:min(30vh,10rem)_2em [[data-visible=^false^]]{maxw35em:transform:translateX(100%)} [[data-visible=^true^]]{maxw35em:transform:translateX(0%)}"
                        id="primary-navigation"
                        data-visible={`${isMenuActive.value}`}
                    >
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link class="text-decoration:none" href={item.path}>
                                    {' '}
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
});
