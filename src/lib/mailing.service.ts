import * as sgMail from '@sendgrid/mail';
export async function sendMail(recipient: string, endpoint: string, fields: string) {

    sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY)

    const msg = {
    to: recipient, // Change to your recipient
    from: 'tlacuilose@outlook.com', // Change to your verified sender
    subject: 'NOTIFY-IF-TRUE: Your API values are TRUE!!',
    text: 'Endpoint: ' + endpoint + 'fields:' + fields,
    html: '<h1>The API Values that you wanted are now TRUE</h1><p><strong>Endpoint:</strong>' + endpoint + '</p><p><strong>Fields:</strong>' + fields
    }

    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}