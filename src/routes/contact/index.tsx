import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { routeLoader$, z } from '@builder.io/qwik-city';
import type { InitialValues } from '@modular-forms/qwik';
import { formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import styles from './contact.css?inline';
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
        body: `name=${values.name}&email=${values.email}&message=${values.message}&myEmail=${env.get('PRIVATE_EMAIL')}`,
    });

    if (!response.ok) {
        return { status: 'error', message: 'An error has occurred!' }
    }

    return { status: 'success', message: 'Contact form successfully submitted!' }
}, zodForm$(contactSchema));

export default component$(() => {
    useStylesScoped$(styles);

    const [contactForm, { Form, Field }] = useForm<ContactForm>({
        loader: useFormLoader(),
        action: useFormAction(),
        validate: zodForm$(contactSchema),
        validateOn: 'change'
    });

    return (
        <Form class="contact-form" id="contact-form">
            {contactForm.submitted &&
                <FeedbackMessage status={contactForm.response?.status} messasge={contactForm.response?.message}/>
            }
            <div class="title">
                <h2>CONTACT US</h2>
            </div>
            <div class="half">
                <Field name="name">
                    {(field, props) => (
                        <div class="item">
                            <label for={field.name}>NAME</label>
                            <input {...props} type="text" value={field.value} required />
                            {field.error && <div style="color:white">{field.error}</div>}
                        </div>
                    )}
                </Field>
                <Field name="email">
                    {(field, props) => (
                        <div class="item">
                            <label for={field.name}>EMAIL</label>
                            <input {...props} type="email" value={field.value} required />
                            {field.error && <div style="color:white">{field.error}</div>}
                        </div>
                    )}
                </Field>
            </div>
            <Field name="message">
                {(field, props) => (
                    <div class="full">
                        <label for={field.name}></label>
                        <textarea {...props} value={field.value} required />
                        {field.error && <div style="color:white">{field.error}</div>}
                    </div>
                )}
            </Field>
            <div class="action">
                <input type="submit" value="SEND MESSAGE" />
            </div>
        </Form>
    );
});
