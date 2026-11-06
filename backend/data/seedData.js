const initialWorkshops = [
  {
    title: 'Prise de Parole en Public & Pitch Impactant',
    instructor: 'Amina Trabelsi',
    category: 'Communication',
    level: 'Intermédiaire',
    format: 'Présentiel',
    location: 'Salle A1 - Espace Innovation',
    date: '2026-11-18',
    time: '10:00',
    duration: 3,
    maxParticipants: 16,
    registeredCount: 11,
    description: 'Techniques de structuration de discours, posture scénique, gestion du trac et captation de l\'attention lors d\'une présentation de projet.',
    status: 'Planifié'
  },
  {
    title: 'Gestion du Temps, Priorisation & Méthodes Agiles',
    instructor: 'Mehdi Ben Salem',
    category: 'Gestion du Temps',
    level: 'Débutant',
    format: 'Présentiel',
    location: 'Salle B3 - Pôle Formation',
    date: '2026-11-20',
    time: '14:30',
    duration: 2.5,
    maxParticipants: 18,
    registeredCount: 14,
    description: 'Application de la matrice d\'Eisenhower, de la méthode Pomodoro et organisation des tâches de développement en sprints Scrum efficaces.',
    status: 'Planifié'
  },
  {
    title: 'Intelligence Émotionnelle & Maîtrise du Stress',
    instructor: 'Sonia Khelifi',
    category: 'Intelligence Émotionnelle',
    level: 'Tous niveaux',
    format: 'En ligne',
    location: 'Google Meet (Lien sécurisé)',
    date: '2026-11-22',
    time: '18:00',
    duration: 2,
    maxParticipants: 25,
    registeredCount: 22,
    description: 'Comprendre ses déclencheurs émotionnels, cultiver l\'empathie au sein d\'une équipe de projet et maintenir sa concentration sous pression.',
    status: 'Planifié'
  },
  {
    title: 'Leadership & Dynamique d\'Équipe pour Développeurs',
    instructor: 'Leila Ben Ammar',
    category: 'Leadership',
    level: 'Avancé',
    format: 'Hybride',
    location: 'Amphi Soft Skills & Visio',
    date: '2026-11-25',
    time: '09:30',
    duration: 4,
    maxParticipants: 12,
    registeredCount: 12,
    description: 'Délégation responsable, feedback constructif en revue de code, motivation des coéquipiers et animation de réunions de cadrage.',
    status: 'Complet'
  },
  {
    title: 'Négociation & Posture en Entretien de Recrutement',
    instructor: 'Karim Dridi',
    category: 'Négociation & Pitch',
    level: 'Intermédiaire',
    format: 'Présentiel',
    location: 'Salle C2 - Hub Carrière',
    date: '2026-11-27',
    time: '15:00',
    duration: 3,
    maxParticipants: 15,
    registeredCount: 8,
    description: 'Valorisation des soft skills face aux recruteurs, négociation de rémunération, gestion des questions pièges et simulation d\'entretiens.',
    status: 'Planifié'
  },
  {
    title: 'Communication Assertive & Résolution de Conflits',
    instructor: 'Youssef Gharbi',
    category: 'Communication',
    level: 'Intermédiaire',
    format: 'Présentiel',
    location: 'Salle A2 - Espace Créatif',
    date: '2026-12-02',
    time: '11:00',
    duration: 3,
    maxParticipants: 14,
    registeredCount: 6,
    description: 'Exprimer clairement ses besoins et désaccords sans agressivité ni passivité, techniques de désamorçage et écoute active.',
    status: 'Planifié'
  }
]

const initialParticipants = [
  {
    fullName: 'Yassine Mansour',
    email: 'yassine.mansour@gmail.com',
    phone: '+216 98 123 456',
    workshopTitle: 'Prise de Parole en Public & Pitch Impactant',
    status: 'Confirmé',
    notes: 'Préparation pour la soutenance finale'
  },
  {
    fullName: 'Meriem Bouazizi',
    email: 'meriem.b@hotmail.com',
    phone: '+216 22 456 789',
    workshopTitle: 'Prise de Parole en Public & Pitch Impactant',
    status: 'Confirmé',
    notes: 'Travail sur l\'intonation et la posture'
  },
  {
    fullName: 'Omar Cherif',
    email: 'omar.cherif@yahoo.fr',
    phone: '+216 55 987 321',
    workshopTitle: 'Gestion du Temps, Priorisation & Méthodes Agiles',
    status: 'Confirmé',
    notes: 'Gestion des priorités projet'
  },
  {
    fullName: 'Nour El Houda',
    email: 'nour.houda@gmail.com',
    phone: '+216 29 888 777',
    workshopTitle: 'Intelligence Émotionnelle & Maîtrise du Stress',
    status: 'En attente',
    notes: 'Session du soir'
  },
  {
    fullName: 'Farouk Jaziri',
    email: 'farouk.j@gmail.com',
    phone: '+216 50 112 233',
    workshopTitle: 'Leadership & Dynamique d\'Équipe pour Développeurs',
    status: 'Confirmé',
    notes: 'Lead dev junior'
  }
]

module.exports = { initialWorkshops, initialParticipants }
