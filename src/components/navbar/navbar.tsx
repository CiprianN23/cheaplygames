import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { BiList } from '../icons/BiList';
import { BiXLg } from '../icons/BiXLg';
import { Logo } from '../icons/Logo';

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
                <div class="color:$text">
                    <Logo class="margin-left:1em"/>
                </div>

                <button
                    class="color:$text display:none border:0 background-color:transparent maxw40em:display:block maxw40em:position:absolute maxw40em:z-index:9999 maxw40em:width:2rem maxw40em:aspect-ratio:1 maxw40em:top:2rem maxw40em:right:2rem"
                    aria-controls="primary-navigation"
                    aria-expanded={`${isMenuActive.value}`}
                    onClick$={() => (isMenuActive.value = !isMenuActive.value)}
                >
                    <span class="sr-only">Menu</span>
                    {!isMenuActive.value && <BiList/>}
                    {isMenuActive.value && <BiXLg/>}
                </button>

                <nav class="margin-right:1.2em">
                    <ul
                        class="display:flex gap:1rem list-style:none
                        maxw40em:background-color:$background-lighten-10 maxw40em:gap:3em maxw40em:position:fixed maxw40em:z-index:1000 maxw40em:inset:0_0_0_0 maxw40em:flex-direction:column maxw40em:padding:min(30vh,10rem)_2em
                        [&[data-visible=false]]{maxw40em:transform:translateX(100%)} [&[data-visible=true]]{maxw40em:transform:translateX(0%)}"
                        id="primary-navigation"
                        data-visible={`${isMenuActive.value}`}
                    >
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link onClick$={() => isMenuActive.value = false} class="text-decoration:none color:$text" href={item.path}>
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
