function showToast(type, message) {
    const toast = document.getElementById("toast");
    const icon = document.getElementById("toast-icon");
    const text = document.getElementById("toast-message");
    const container = document.getElementById("toast-container");

    if (type === "success") {
        toast.classList.remove("border-red-500");
        toast.classList.add("border-green-500");
        icon.textContent = "✅";
    } else {
        toast.classList.remove("border-green-500");
        toast.classList.add("border-red-500");
        icon.textContent = "❌";
    }

    text.textContent = message;
    container.classList.remove("hidden");

    setTimeout(() => {
        container.classList.add("hidden");
    }, 4000);
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = form.user_name.value.trim();
        const email = form.user_email.value.trim();
        const message = form.message.value.trim();
        const button = form.querySelector("button[type='submit']");
        const honeypot = form.querySelector('[name="bot-field"]');

        const captchaField = document.getElementById("error-captcha");

        const fields = [
            { id: "user_name", label: "nombre" },
            { id: "user_email", label: "correo" },
            { id: "message", label: "mensaje" },
        ];

        let hasError = false;

        fields.forEach(({ id, label }) => {
            const input = form.querySelector(`[name="${id}"]`);
            const errorMsg = document.getElementById(`error-${id}`);

            if (!input.value.trim()) {
                input.classList.add("border-red-500");
                errorMsg.textContent = `⚠️ El campo ${label} es obligatorio.`;
                errorMsg.classList.remove("hidden");
                if (!hasError) input.focus();
                hasError = true;
            } else {
                input.classList.remove("border-red-500");
                errorMsg.textContent = "";
                errorMsg.classList.add("hidden");
            }
        });

        // Validación avanzada del mensaje
        if (!hasError) {
            if (message.length < 10) {
                showToast("error", "✏️ El mensaje debe tener al menos 10 caracteres.");
                return;
            }
            if (message.length > 1000) {
                showToast("error", "🚫 El mensaje es demasiado largo. Máximo 1000 caracteres.");
                return;
            }
        }

        if (hasError || (honeypot && honeypot.value.trim() !== "")) return;

        button.disabled = true;
        button.textContent = "Enviando...";

        try {
            // Obtener token del reCAPTCHA v3
            const token = await grecaptcha.execute('6LfHQpsrAAAAACQtMcKKgtNPf5rkGGk2sIL1c_co', { action: 'submit' });
            document.getElementById('g-recaptcha-response').value = token;

            // Enviar formulario
            await emailjs.sendForm('service_dfy7tsb', 'template_rpb65by', form, '0KNlUt0vqMH7Fytbf');
            showToast("success", "✅ Mensaje enviado correctamente.");
            form.reset();
        } catch (error) {
            showToast("error", "❌ No se pudo enviar el mensaje. Inténtalo más tarde.");
        } finally {
            button.disabled = false;
            button.textContent = "Enviar";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupContactForm();
});
