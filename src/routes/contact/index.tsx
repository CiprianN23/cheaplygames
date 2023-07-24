import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, z } from '@builder.io/qwik-city';
import type { InitialValues } from '@modular-forms/qwik';
import { formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import { FeedbackMessage } from '~/components/feedbackmessage/feedbackmessage';

const contactSchema = z.object({
    name: z.string().min(1, 'Please enter your name.'),
    email: z
        .string()
        .min(1, 'Please enter your email.')
        .email('Invalid email address format. (example@mail.com)'),
    message: z.string().min(1, 'Please enter your message.'),
});

type ContactForm = z.infer<typeof contactSchema>;

export const useFormLoader = routeLoader$<InitialValues<ContactForm>>(() => ({
    name: '',
    email: '',
    message: '',
}));

export const useFormAction = formAction$<ContactForm>(async (values, { env }) => {
    const response = await fetch('https://mazi.ro/contact-submit.php', {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: `name=${values.name}&email=${values.email}&message=${
            values.message
        }&myEmail=${env.get('PRIVATE_EMAIL')}`,
    });

    if (!response.ok) {
        return { status: 'error', message: 'An error has occurred!' };
    }

    return { status: 'success', message: 'Contact form successfully submitted!' };
}, zodForm$(contactSchema));

export default component$(() => {
    const [contactForm, { Form, Field }] = useForm<ContactForm>({
        loader: useFormLoader(),
        action: useFormAction(),
        validate: zodForm$(contactSchema),
        validateOn: 'change',
    });

    return (
        <>
            <Form
                class="background:$secondary width:50rem margin:50px_auto max-width:97% border-radius:4px padding:55px_30px"
                id="contact-form"
            >
                {contactForm.submitted && (
                    <FeedbackMessage
                        status={contactForm.response?.status}
                        messasge={contactForm.response?.message}
                    />
                )}
                <div>
                    <h1 class="font-size:$fontSize500 letter-spacing:6px border-bottom:1px_solid_$text display:inline-block padding-bottom:8px margin-bottom:32px color:$text">
                        CONTACT US
                    </h1>
                </div>
                <div class="display:flex justify-content:space-between maxw40em:flex-direction:column">
                    <Field name="name">
                        {(field, props) => (
                            <div class="display:flex flex-direction:column margin-bottom:24px width:48% maxw40em:width:100%">
                                <label class="display:block font-size:$fontSize300 letter-spacing:0.2em margin-bottom:16px color:$text" for={field.name}>NAME</label>
                                <input
                                    {...props}
                                    type="text"
                                    id={field.name}
                                    value={field.value}
                                    required
                                    class="border-radius:4px border:1px_solid_$text outline:0 padding:16px width:100% height:44px background:$background"
                                />
                                {field.error && <div class="color:$text font-size:$fontSize300">{field.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="email">
                        {(field, props) => (
                            <div class="display:flex flex-direction:column margin-bottom:24px width:48% maxw40em:width:100%">
                                <labe class="display:block font-size:$fontSize300 letter-spacing:0.2em margin-bottom:16px color:$text" for={field.name}>EMAIL</labe>
                                <input
                                    {...props}
                                    type="email"
                                    id={field.name}
                                    value={field.value}
                                    required
                                    class="border-radius:4px border:1px_solid_$text outline:0 padding:16px width:100% height:44px background:$background"
                                />
                                {field.error && <div class="color:$text font-size:$fontSize300">{field.error}</div>}
                            </div>
                        )}
                    </Field>
                </div>
                <div>
                    <Field name="message">
                        {(field, props) => (
                            <div class="margin-bottom:24px">
                                <label class="display:block font-size:$fontSize300 letter-spacing:0.2em margin-bottom:16px color:$text" for={field.name}>Message</label>
                                <textarea
                                    {...props}
                                    id={field.name}
                                    value={field.value}
                                    required
                                    class="border-radius:4px border:1px_solid_$text outline:0 padding:12px_16px width:100% height:200px background:$background"
                                />
                                {field.error && <div class="color:$text font-size:$fontSize300">{field.error}</div>}
                            </div>
                        )}
                    </Field>
                </div>
                <div class="margin-bottom:32px maxw40em:display:flex maxw40em:flex-direction:column">
                    <input type="submit" value="SEND MESSAGE" class="border-radius:4px border:1px_solid_$text cursor:pointer font-weight:600 height:44px letter-spacing:0.1em outline:0 padding:0_20px_0_22px margin-right:10px background:$accent color:$secondary maxw40em:margin-bottom:10px maxw40em:width:100%" />
                </div>
            </Form>
        </>
    );
});

export const head: DocumentHead = {
    title: 'CheaplyGames - Contact',
    meta: [
        {
            name: 'description',
            content: 'Contact us page for CheaplyGames',
        },
    ],
};
