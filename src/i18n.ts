import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Proof Review': 'Proof Review',
      'Order': 'Order',
      'Message from Seller': 'Message from Seller',
      'Please review your proof carefully. Check all text, colors, and design elements.': 'Please review your proof carefully. Check all text, colors, and design elements.',
      'Approve Design': 'Approve Design',
      'Enter your revision request...': 'Enter your revision request...',
      'Request Changes': 'Request Changes',
      'I confirm that I have reviewed all details and understand that this approval is final.': 'I confirm that I have reviewed all details and understand that this approval is final.',
      'You can undo your approval within': 'You can undo your approval within',
      'Undo Approval': 'Undo Approval',
      'Your Comments': 'Your Comments',
      'Proof Approved': 'Proof Approved',
      'Changes Requested': 'Changes Requested',
      'Waiting for Proof': 'Waiting for Proof',
      'Proof Sent for Review': 'Proof Sent for Review',
    },
  },
  es: {
    translation: {
      'Proof Review': 'Revisión de Prueba',
      'Order': 'Pedido',
      'Message from Seller': 'Mensaje del Vendedor',
      'Please review your proof carefully. Check all text, colors, and design elements.': 'Por favor, revise su prueba cuidadosamente. Verifique todo el texto, colores y elementos de diseño.',
      'Approve Design': 'Aprobar Diseño',
      'Enter your revision request...': 'Ingrese su solicitud de revisión...',
      'Request Changes': 'Solicitar Cambios',
      'I confirm that I have reviewed all details and understand that this approval is final.': 'Confirmo que he revisado todos los detalles y entiendo que esta aprobación es final.',
      'You can undo your approval within': 'Puede deshacer su aprobación dentro de',
      'Undo Approval': 'Deshacer Aprobación',
      'Your Comments': 'Sus Comentarios',
      'Proof Approved': 'Prueba Aprobada',
      'Changes Requested': 'Cambios Solicitados',
      'Waiting for Proof': 'Esperando Prueba',
      'Proof Sent for Review': 'Prueba Enviada para Revisión',
    },
  },
  fr: {
    translation: {
      'Proof Review': 'Révision de l\'Épreuve',
      'Order': 'Commande',
      'Message from Seller': 'Message du Vendeur',
      'Please review your proof carefully. Check all text, colors, and design elements.': 'Veuillez examiner attentivement votre épreuve. Vérifiez tous les textes, couleurs et éléments de conception.',
      'Approve Design': 'Approuver le Design',
      'Enter your revision request...': 'Entrez votre demande de révision...',
      'Request Changes': 'Demander des Modifications',
      'I confirm that I have reviewed all details and understand that this approval is final.': 'Je confirme avoir examiné tous les détails et comprendre que cette approbation est définitive.',
      'You can undo your approval within': 'Vous pouvez annuler votre approbation dans',
      'Undo Approval': 'Annuler l\'Approbation',
      'Your Comments': 'Vos Commentaires',
      'Proof Approved': 'Épreuve Approuvée',
      'Changes Requested': 'Modifications Demandées',
      'Waiting for Proof': 'En Attente de l\'Épreuve',
      'Proof Sent for Review': 'Épreuve Envoyée pour Révision',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 