import { useEffect, useRef, useState } from 'react'
import portrait from './assets/portrait.JPG'

const navItems = [
  ['Home', 'home'],
  ['CV', 'about'],
  ['Publications', 'publications'],
  ['Teaching', 'teaching'],
  ['Blog', 'blog'],
  ['Contact', 'contact'],
]

const positions = [
  {
    period: '2021 - 2026',
    title: 'Staff Research Scientist',
    place: 'Sony AI, Zurich',
  },
  {
    period: '2017 - 2021',
    title: 'Postdoctoral Researcher',
    place: 'EPFL, LTS4 laboratory',
  },
  {
    period: '2015 - 2017',
    title: 'Postdoctoral Researcher',
    place: 'Universite de Bordeaux, IMS department',
  },
]

const education = [
  {
    period: '2010 - 2014',
    title: 'PhD in Computer Science',
    place: 'Université Gustave Eiffel (UGE), Paris',
    description: 'Optimization methods for image and signal processing, with applications to computer vision and machine learning.',
  },
  {
    period: '2009 - 2010',
    title: 'Master of Science in Wireless Communications',
    place: 'CentraleSupélec, Paris',
    description: 'Advanced communication systems and signal processing.',
  },
]

const publications = [
  {
    group: 'Journal Papers',
    items: [
      {
        id: 'J9',
        text: 'P. Durr, M. El Gheche, et al., Outplaying elite table tennis players with an autonomous robot, Nature 652 (8111), Pages 886-891, Apr. 2026.',
        links: [
          {
            label: 'Nature',
            href: 'https://www.nature.com/articles/s41586-026-10338-5',
          },
        ],
      },
      {
        id: 'J8',
        text: 'H. Petric Maretic, M. El Gheche, M. Minder, G. Chierchia, P. Frossard, Wasserstein-based Graph Alignment, IEEE Transactions on Signal and Information Processing over Networks, Vol. 8, Pages 353-363, Apr. 2022.',
        links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2003.06048' }],
      },
      {
        id: 'J7',
        text: 'M. El Gheche, G. Chierchia, P. Frossard, Orthonet: Multilayer network data clustering, IEEE Transactions on Signal and Information Processing over Networks, Vol. 6, Pages 13-23, Dec. 2020.',
        links: [
          { label: 'PDF', href: 'https://arxiv.org/pdf/1811.00821.pdf' },
          { label: 'Code', href: 'https://github.com/LTS4/OrthoNet' },
        ],
      },
      {
        id: 'J6',
        text: 'M. Mounirou, M. El Gheche, M. Donias, S. Guillon, Y. Berthoumieu, Robust and Adaptive Approaches for Relative Geologic Time Estimation, Journal of Applied Geophysics, Vol. 159, Pages 157-172, Dec. 2018.',
        links: [{ label: 'DOI', href: 'https://doi.org/10.1016/j.jappgeo.2018.07.013' }],
      },
      {
        id: 'J5',
        text: 'M. El Gheche, G. Chierchia, J.-C. Pesquet, Proximity Operators of Discrete Information Divergences, IEEE Transactions on Information Theory, Vol. 64, No. 2, Pages 1092-1104, Feb. 2018.',
        links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/1606.09552' }],
      },
      {
        id: 'J4',
        text: 'G. Chierchia, M. El Gheche, G. Scarpa and L. Verdoliva, Multitemporal SAR Image Despeckling based on Block-Matching and Collaborative Filtering, IEEE Transactions on Geoscience and Remote Sensing, Vol. 55, No. 10, Pages 1-14, Jun. 2017.',
        links: [
          { label: 'PDF', href: 'https://perso.esiee.fr/~chierchg/articles/2017_tgrs.pdf' },
          { label: 'DOI', href: 'https://doi.org/10.1109/TGRS.2017.2707806' },
        ],
      },
      {
        id: 'J3',
        text: 'M. El Gheche, J.-F. Aujol, Y. Berthoumieu, C.-A. Deledalle, Texture Reconstruction Guided by the Histogram of a High-Resolution Patch, IEEE Transactions on Image Processing, Vol. 26, No. 2, Pages 549-560, Feb. 2017.',
        links: [{ label: 'HAL', href: 'https://hal.archives-ouvertes.fr/hal-01276582' }],
      },
      {
        id: 'J2',
        text: 'M. Hidane, M. El Gheche, J.-F. Aujol, Y. Berthoumieu, C.-A. Deledalle, Image Zoom Completion, IEEE Transactions on Image Processing, Vol. 25, No. 8, Pages 3505-3517, Aug. 2016.',
        links: [{ label: 'HAL', href: 'https://hal.archives-ouvertes.fr/hal-01253124' }],
      },
      {
        id: 'J1',
        text: 'C. Chaux, M. El Gheche, J. Farah, J.-C. Pesquet, and B. Pesquet-Popescu, A Parallel Proximal Splitting Method for Disparity Estimation from Multicomponent Images under Illumination Variation, Journal of Mathematical Imaging and Vision, Vol. 47, No. 3, Pages 167-178, Nov. 2013.',
        links: [{ label: 'Springer', href: 'https://link.springer.com/article/10.1007/s10851-012-0361-z' }],
      },
    ],
  },
  {
    group: 'Conference Papers',
    items: [
      {
        id: 'C17',
        text: 'H. Petric Maretic, M. El Gheche, G. Chierchia, P. Frossard, fGOT: filter Graph distances using Optimal Transport, AAAI, Virtual Event, 22 Feb. - 1 Mar. 2022.',
        links: [{ label: 'AAAI', href: 'https://ojs.aaai.org/index.php/AAAI/article/view/20738' }],
      },
      {
        id: 'C16',
        text: 'M. Minder, Z. Farsijani, D. Shah, M. El Gheche, P. Frossard, FiGLearn: Filter and Graph Learning using Optimal Transport, ICASSP, Toronto, Ontario, Canada, 6-11 Jun. 2021.',
        links: [{ label: 'arXiv', href: 'http://arxiv.org/abs/2010.15457' }],
      },
      {
        id: 'C15',
        text: 'G. Chierchia and M. El Gheche, YAPA: Accelerated Proximal Algorithm for Convex Composite Problems, ICASSP, Toronto, Ontario, Canada, 6-11 Jun. 2021.',
        links: [{ label: 'DOI', href: 'https://doi.org/10.1109/ICASSP39728.2021.9414656' }],
      },
      {
        id: 'C14',
        text: 'M. Rossi, M. El Gheche, A. Kuhn, P. Frossard, Joint Graph-based Depth Refinement and Normal Estimation, CVPR, Seattle, Washington, United States, 13-19 Jun. 2020.',
        links: [
          { label: 'arXiv', href: 'https://arxiv.org/abs/1912.01306' },
          { label: 'Code', href: 'https://github.com/rossimattia/depth-refinement-and-normal-estimation' },
        ],
      },
      {
        id: 'C13',
        text: 'G. Ortiz Jimenez, M. El Gheche, E. Simou, H. Petric Maretic, P. Frossard, Forward-Backward Splitting for Optimal Transport based Problems, ICASSP, Barcelona, Spain, 4-8 May 2020.',
        links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/1909.11448' }],
      },
      {
        id: 'C12',
        text: 'M. El Gheche and P. Frossard, Multilayer Clustered Graph Learning, preprint, 2020.',
        links: [{ label: 'arXiv', href: 'http://arxiv.org/abs/2010.15456' }],
      },
      {
        id: 'C11',
        text: 'H. Petric Maretic, M. El Gheche, G. Chierchia, P. Frossard, GOT: An Optimal Transport framework for Graph comparison, NeurIPS, Vancouver, Canada, 8-14 Dec. 2019.',
        links: [
          { label: 'arXiv', href: 'https://arxiv.org/abs/1906.02085' },
          { label: 'Code', href: 'https://github.com/Hermina/GOT' },
        ],
      },
      {
        id: 'C10',
        text: 'H. Petric Maretic, M. El Gheche, P. Frossard, Graph Heat Mixture Model Learning, Asilomar, Pacific Grove, CA, USA, 3-6 Nov. 2019.',
        links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/1901.08585' }],
      },
      {
        id: 'C9',
        text: 'B. Pasdeloup, H. Petric Maretic, M. El Gheche, P. Frossard, Une approche basee incertitude pour transporter un signal d un graphe a un autre, Gretsi, Lille, France, 26-29 Aug. 2019.',
        links: [{ label: 'PDF', href: 'https://www.gretsi.fr/data/colloque/pdf/2019_pasdeloup370.pdf' }],
      },
      {
        id: 'C8',
        text: 'M. El Gheche, G. Chierchia, P. Frossard, Stochastic Gradient Descent for Spectral Embedding with Implicit Orthogonality Constraint, ICASSP, Pages 3567-3571, Brighton, UK, 12-17 May 2019.',
        links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/1812.05721' }],
      },
      {
        id: 'C7',
        text: 'M. Rossi, M. El Gheche, P. Frossard, A Non-smooth Graph-Based Approach to Light Field Super-resolution, ICIP, Pages 2590-2594, Athens, Greece, 7-10 Oct. 2018.',
        links: [{ label: 'IEEE', href: 'https://ieeexplore.ieee.org/document/8451127' }],
      },
      {
        id: 'C6',
        text: 'M. Mounirou, M. El Gheche, M. Donias, S. Guillon, Y. Berthoumieu, Calcul automatique rapide de pseudo-age geologique sur des images sismiques, Gretsi, Juan-Les-Pins, France, 5-8 Sep. 2017.',
        links: [{ label: 'PDF', href: 'https://www.gretsi.fr/data/colloque/pdf/2017_mounirouarouna211.pdf' }],
      },
      {
        id: 'C5',
        text: 'M. El Gheche, A. Jezierska, J.-C. Pesquet and J. Farah, A Proximal Approach for Signal Recovery Based on Information Measures, EUSIPCO, Pages 1-5, Marrakech, Morocco, 9-13 Sep. 2013.',
        links: [{ label: 'PDF', href: 'https://www-syscom.univ-eiffel.fr/~elgheche/images/EUSIPCO_ELGHECHE.pdf' }],
      },
      {
        id: 'C4',
        text: 'M. El Gheche, J.-C. Pesquet and J. Farah, A Proximal Approach for Optimization Problems involving Kullback Divergences, ICASSP, Pages 5984-5988, Vancouver, Canada, 26-31 May 2013.',
        links: [{ label: 'PDF', href: 'https://citeseerx.ist.psu.edu/document?doi=2a09fcce80f5f0319503e6c9563c61f8a6ac7987&repid=rep1&type=pdf' }],
      },
      {
        id: 'C3',
        text: 'M. El Gheche, C. Chaux, J.-C. Pesquet, J. Farah and B. Pesquet-Popescu, Disparity Map Estimation under Convex Constraints using Proximal Algorithms, SIPS, Pages 293-298, Beirut, Lebanon, 4-7 Oct. 2011.',
        links: [{ label: 'PDF', href: 'https://www-syscom.univ-mlv.fr/~elgheche/images/ELGHECHE_SIPS_2011.pdf' }],
      },
      {
        id: 'C2',
        text: 'M. El Gheche, J.-C. Pesquet, C. Chaux, J. Farah et B. Pesquet-Popescu, Methodes Proximales pour l estimation du champ de disparite a partir d une paire d images stereoscopiques en presence de variations d illumination, GRETSI, Bordeaux, France, 5-8 Sep. 2011.',
        links: [{ label: 'PDF', href: 'https://www.gretsi.fr/data/colloque/pdf/2011_chaux454.pdf' }],
      },
      {
        id: 'C1',
        text: 'M. El Gheche, J.-C. Pesquet, J. Farah, M. Kaaniche and B. Pesquet-Popescu, Proximal Splitting Methods for Depth Estimation, ICASSP, Pages 853-856, Prague, Czech Republic, 22-27 May 2011.',
        links: [{ label: 'DOI', href: 'https://doi.org/10.1109/ICASSP.2011.5946538' }],
      },
    ],
  },
  {
    group: 'Workshops',
    items: [
      {
        id: 'W3',
        text: 'M. El Gheche and P. Frossard, Multilayer Graph Clustering with Optimized Node Embedding, DSLW workshop, Toronto, Canada, 5-6 Jun. 2021.',
      },
      {
        id: 'W2',
        text: 'G. Ortiz Jimenez, M. El Gheche, E. Simou, H. Petric Maretic, P. Frossard, CDOT: Continuous Domain Adaptation using Optimal Transport, NeurIPS OTML workshop, Vancouver, Canada, 8-14 Dec. 2019.',
        links: [{ label: 'PDF', href: 'https://arxiv.org/pdf/1909.11448.pdf' }],
      },
      {
        id: 'W1',
        text: 'M. El Gheche, J.-F. Aujol, Y. Berthoumieu, C.-A. Deledalle, R. Fablet, Texture Synthesis Guided by a Low-Resolution Image, IVMSP Workshop, Bordeaux, France, 11-12 Jul. 2016.',
      },
    ],
  },
  {
    group: 'PhD',
    items: [
      {
        id: 'PhD',
        text: 'M. El Gheche, Optimization methods for image and signal processing, with applications to computer vision and machine learning, May 2014.',
        links: [{ label: 'PDF', href: 'https://pastel.hal.science/tel-01124306/document' }],
      },
    ],
  },
]

const blogPosts = [
  {
    id: 'techdrive-zurich-interview',
    category: 'Interview',
    date: 'August 2026',
    readingTime: '25 min watch',
    title: 'In conversation with TechDrive Zurich',
    excerpt: 'A conversation about building AI and teaching a robot to play table tennis.',
    content: [
      'I joined TechDrive Zurich for a conversation about my journey in AI and robotics, and the years of research behind teaching an autonomous robot to compete in table tennis.',
      'Watch the short highlight or settle in for the full 25-minute conversation.',
    ],
    videos: [
      {
        id: '26HN3gHppXM',
        label: 'Short highlight',
        orientation: 'portrait',
        href: 'https://youtube.com/shorts/26HN3gHppXM',
      },
      {
        id: 'pxH66TFgfu8',
        label: 'Full interview · 25 min',
        orientation: 'landscape',
        href: 'https://youtu.be/pxH66TFgfu8',
      },
    ],
  },
  {
    id: 'physical-intelligence',
    category: 'AI & Robotics',
    date: 'June 2026',
    readingTime: '15 min watch',
    title: 'When intelligence gets physical',
    excerpt:
      'How AI learns to perceive, move, and act in the real world.',
    href: 'https://youtu.be/F86Vx3eQgBg?si=BPSbkg0z8MDGxxqA',
    videoId: 'F86Vx3eQgBg',
    action: 'Watch video',
    content: [
      'What happens when AI leaves the screen and enters the physical world? In my talk, I explored why robotics is where intelligence has to deal with reality: physics, timing, sensors, movement, safety, and of course, unpredictable humans.',
      'I also shared some lessons from my work on an autonomous table tennis robot, a project that taught me how hard and exciting it is to build systems that can perceive, decide, and act in real time.',
      'There is a great future ahead, and we all have a role in shaping it.',
    ],
  },
  {
    id: 'kuchisabishii',
    category: 'Japanese & Culture',
    readingTime: '1 min read',
    title: 'Kuchisabishii (口寂しい)',
    boldTitle: true,
    action: 'Read note',
    content: [
      'Kuchisabishii (口寂しい) literally means “lonely mouth.” It describes the mysterious urge to snack when you are not really hungry, but your mouth is simply bored.',
      'Kuchi means “mouth,” and sabishii means “lonely.” Together, they capture that moment when your mouth needs a little therapy and your hand starts moving toward the chips on autopilot.',
      'It is one of my favorite Japanese words because it gives a name to such a relatable little feeling.',
    ],
  },
  {
    id: 'favorite-ai-joke',
    category: 'AI & Culture',
    readingTime: '1 min read',
    title: 'Building smarter AI is easy. Teaching it sarcasm? Yeah, sure.',
    imageAlt: 'A comic about an AI trying to understand sarcasm.',
    imageSrc: '/ai-sarcasm-joke.png',
    action: 'Read joke',
    content: [],
  },
  {
    id: 'mireille-meaning',
    category: 'Personal',
    readingTime: '2 min read',
    title: 'What does Mireille mean?',
    excerpt: 'The meaning behind the name Mireille.',
    action: 'Read note',
    content: [
      'Mireille is a French name with Provençal roots, often associated with ideas of admiration, wonder, and a sense of looking at the world with attentive curiosity.',
      'In Japanese, the similar-sounding name Mirei can be written in several ways depending on the kanji chosen. One possible form is 美礼 (みれい). The character 美 means “beauty,” while 礼 conveys “courtesy,” “respect,” “manners,” or “etiquette.” Together, they can suggest a kind of beauty expressed not only through appearance, but also through conduct, consideration, and graceful attention to others.',
      'Seen alongside the French and Provençal associations of Mireille, the name brings together a number of complementary ideas: beauty, refinement, respect, curiosity, and wonder. It can evoke a gentle and dignified presence, someone attentive to detail and sensitive to the beauty found in people, gestures, and everyday surroundings.',
      'In that sense, Mireille carries both softness and depth. It suggests beauty as something to notice, appreciate, and express through the way one moves through the world.',
    ],
  },
]

const courseChapters = [
  {
    id: 1,
    title: 'Building the central idea behind a language model',
    summary: [
      'In this first chapter, we are going to build the central idea behind a language model from the ground up.',
      'We will begin with a very simple question: given some text, how can a computer predict what is likely to come next?',
      ],
  },
  {
    id: 2,
    title: 'The language-model pipeline',
    summary: [
      'The central message of this lecture is that next-token prediction is the core computational task of a language model, but many other decisions determine its behavior.',
      'Real applications usually place the model inside a larger system that may include memory, document retrieval, tools, databases, or web services.',
    ],
  },
  {
    id: 3,
    title: 'From text to tokens',
    summary: [
      'In this chapter, we focus on the very first part of that pipeline: how text becomes something a language model can process. When we type a sentence into a language model, the model does not directly receive words or characters. The text first has to be converted into numerical representations.',
      'The first major step in that process is tokenization.',
    ],
  },

  {
    id: 4,
    title: 'The decoder-only Transformer',
    summary: [
      'In this chapter, we move to the next part of the pipeline and ask: what does the model actually do with those tokens?',
      'We will focus on the architecture used by most modern generative language models: the decoder-only Transformer.',
    ],
  },
  {
    id: 5,
    title: 'How a model learns',
    summary: [
      'We move to the next question: how does a model actually learn?',
      'This chapter focuses on pretraining, the stage where a language model develops its broad language capabilities.',
    ],
  },
  {
    id: 6,
    title: 'Post-training',
    summary: [
      'In this chapter, we move to the second major training stage: post-training.',
      'The basic question is: once we have a capable pretrained model, how do we make it behave the way we actually want?',
    ],
  },
]

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2F7CBC]">{eyebrow}</p>
      {title ? <h2 className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">{title}</h2> : null}
      <div className={title ? 'mt-6' : 'mt-4'}>{children}</div>
    </section>
  )
}

function ExternalLink({ href, children }) {
  return (
    <a
      className="rounded-full border border-[#C2DBF0] px-3 py-1 text-xs font-medium text-[#245F8F] transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF]"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

export default function App() {
  const [selectedBlogPostId, setSelectedBlogPostId] = useState(blogPosts[0].id)
  const [selectedCourseChapterId, setSelectedCourseChapterId] = useState(courseChapters[0].id)
  const [blogListHeight, setBlogListHeight] = useState(null)
  const blogListRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const blogList = blogListRef.current
    if (!blogList) return undefined

    const updateHeight = () => setBlogListHeight(blogList.getBoundingClientRect().height)
    const resizeObserver = new ResizeObserver(updateHeight)

    updateHeight()
    resizeObserver.observe(blogList)

    return () => resizeObserver.disconnect()
  }, [])

  const selectedBlogPost = blogPosts.find((post) => post.id === selectedBlogPostId)
  const selectedCourseChapter = courseChapters.find((chapter) => chapter.id === selectedCourseChapterId)

  return (
    <div className={`min-h-screen text-slate-800 transition-colors duration-300 ${isDarkMode ? 'theme-dark bg-[#0C1524]' : 'bg-[#F3F8FD]'}`}>
      <button
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="theme-toggle fixed right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#C2DBF0] bg-white text-lg text-[#245F8F] shadow-sm transition hover:-translate-y-0.5 hover:border-[#2F7CBC] hover:bg-[#EDF6FF]"
        onClick={() => setIsDarkMode((currentMode) => !currentMode)}
        title={isDarkMode ? 'Light mode' : 'Dark mode'}
        type="button"
      >
        <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
      </button>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-5 md:px-6 lg:grid-cols-[300px_1fr] lg:py-8">
        <aside className="lg:sticky lg:top-8 lg:h-fit">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <img
              alt="Mireille El Gheche"
              className="aspect-[4/5] w-full rounded-md object-cover object-top"
              src={portrait}
            />
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-slate-950">Mireille El Gheche</h1>
            <p className="mt-2 text-sm text-slate-600">美礼 (みれい, Mi-rei)</p>
            <p className="mt-2 text-sm font-medium text-[#245F8F]">Staff Research Scientist</p>
            <p className="mt-2 text-sm text-slate-600">Zurich, Switzerland</p>
            <nav className="mt-6 grid gap-2 border-t border-slate-200 pt-5">
              {navItems.map(([label, id]) => (
                <a
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  href={`#${id}`}
                  key={id}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 space-y-6">
          <section id="home" className="scroll-mt-6 overflow-hidden rounded-lg border border-[#C2DBF0] bg-white shadow-sm">
            <div className="border-t-4 border-[#3982D5] p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2F7CBC]">Profile</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                I am a staff research scientist in AI and robotics based in Zurich. My work focuses on taking
                reinforcement learning, computer vision, sensing, and control from research ideas to integrated
                physical AI systems that can be tested, demonstrated, and deployed in real environments.
              </p>
              <div className="mt-8 border-t border-[#C2DBF0] pt-5">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    'AI & Robotics',
                    'Real-World ML Systems',
                    'PhD',
                  ].map((item) => (
                    <div className="border-l-2 border-[#3982D5] pl-3 text-sm font-medium leading-6 text-slate-700" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Section eyebrow="CV" id="about">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="grid h-full grid-rows-[auto_1fr] gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Experience</h3>
                <div className="flex flex-col gap-4 lg:justify-between">
                  {positions.map((position) => (
                    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={`${position.period}-${position.title}`}>
                      <p className="text-sm font-medium text-[#245F8F]">{position.period}</p>
                      <h4 className="mt-1 text-sm font-semibold leading-snug text-slate-950">{position.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{position.place}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid h-full grid-rows-[auto_1fr] gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Education</h3>
                <div className="flex flex-col gap-4 lg:justify-between">
                  {education.map((item) => (
                    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={`${item.period}-${item.title}`}>
                      <p className="text-sm font-medium text-[#245F8F]">{item.period}</p>
                      <h4 className="mt-1 text-sm font-semibold leading-snug text-slate-950">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{item.place}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section eyebrow="Publications" id="publications">
            <div className="space-y-4">
              {publications.map((section) => (
                <details className="group rounded-md border border-slate-200 bg-white" key={section.group} name="publication-group">
                  <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-medium text-[#245F8F] transition hover:bg-[#EDF6FF] [&::-webkit-details-marker]:hidden">
                    <span className="h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#2F7CBC] transition group-open:rotate-90" />
                    <span>{section.group === 'Journal Papers' ? 'Journal Articles' : section.group}</span>
                  </summary>
                  <div className="space-y-2 p-3">
                    {section.items.length === 0 ? (
                      <p className="text-sm leading-5 text-slate-500">To be added.</p>
                    ) : null}
                    {section.items.map((paper) => (
                      <article className="rounded-md border border-slate-200 bg-white p-3" key={paper.id}>
                        <div className="flex flex-col gap-3 md:flex-row md:items-start">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm leading-5 text-slate-700">{paper.text}</p>
                            {paper.links ? (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {paper.links.map((link) => (
                                  <ExternalLink href={link.href} key={`${paper.id}-${link.label}`}>
                                    {link.label}
                                  </ExternalLink>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </Section>

          <Section eyebrow="Teaching" id="teaching">
            <div className="space-y-6 text-base leading-8 text-slate-700">
              <p>
                I have taught university-level courses, supervised PhD students, and mentored engineers and researchers across applied machine learning,
                AI, and optimization projects. My teaching and mentoring work has focused on helping students and research teams connect theoretical
                methods to practical problems.
              </p>
              <article className="rounded-lg border border-[#C2DBF0] bg-[#F7FBFF] p-5 md:p-6">
                <div className="flex flex-col gap-3 border-b border-[#C2DBF0] pb-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2F7CBC]">Course in preparation</p>
                    <h3 className="mt-2 text-xl font-semibold leading-tight text-slate-950 md:text-2xl">Language Models</h3>
                  </div>
                  <p className="text-sm text-slate-600 md:text-right">
                    In collaboration with{' '}
                    <a
                      className="font-medium text-[#245F8F] hover:underline"
                      href="https://perso.esiee.fr/~chierchg/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Giovanni Chierchia
                    </a>
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  This course is organized as a set of six chapters, building the central ideas behind language models from first principles.
                </p>
                <div className="mt-5 grid gap-4 lg:h-[16rem] lg:grid-cols-[minmax(150px,0.24fr)_minmax(0,0.76fr)] lg:items-start">
                  <div className="grid min-h-0 gap-2 lg:h-full lg:grid-rows-6" role="list">
                    {courseChapters.map((chapter) => {
                      const isSelected = selectedCourseChapter?.id === chapter.id

                      return (
                        <button
                          aria-pressed={isSelected}
                          className={`relative block w-full overflow-hidden rounded-lg border border-slate-200 py-2 pr-3 pl-4 text-left transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF] ${
                            isSelected ? 'bg-[#F7FBFF]' : ''
                          }`}
                          key={chapter.id}
                          onClick={() => setSelectedCourseChapterId(chapter.id)}
                          role="listitem"
                          type="button"
                        >
                          {isSelected ? <span className="absolute inset-y-0 left-0 w-1 bg-[#3982D5]" aria-hidden="true" /> : null}
                          <span className="block text-sm font-semibold leading-snug text-slate-950">
                            Chapter {chapter.id}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {selectedCourseChapter ? (
                    <article className="h-full min-h-0 overflow-y-auto rounded-xl border-[3px] border-[#3982D5] bg-[#FBFDFF] p-4 shadow-[0_0_18px_rgba(57,130,213,0.16)] md:p-5">
                      <div className="space-y-3 text-sm leading-7 text-slate-700">
                        {selectedCourseChapter.summary.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <p className="mt-5 border-t border-[#C2DBF0] pt-3 text-xs font-medium text-slate-500">Coming soon</p>
                    </article>
                  ) : null}
                </div>
              </article>
            </div>
          </Section>

          <Section eyebrow="Blog" id="blog">
            <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.32fr)_minmax(0,0.68fr)] lg:items-start">
              <div className="grid gap-2" ref={blogListRef} role="list">
                {blogPosts.map((post) => {
                  const isSelected = selectedBlogPost?.id === post.id

                  return (
                    <button
                      aria-pressed={isSelected}
                      className={`relative block w-full overflow-hidden rounded-lg border border-slate-200 py-3 pr-3 pl-4 text-left transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF] ${
                        isSelected ? 'bg-[#F7FBFF]' : ''
                      }`}
                      key={post.id}
                      onClick={() => setSelectedBlogPostId(post.id)}
                      role="listitem"
                      type="button"
                    >
                      {isSelected ? <span className="absolute inset-y-0 left-0 w-1 bg-[#3982D5]" aria-hidden="true" /> : null}
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#245F8F]">
                        {post.category}
                        {post.date ? (
                          <>
                            <span aria-hidden="true" className="mx-1.5 text-slate-400">·</span>
                            <span className="font-medium normal-case tracking-normal text-slate-500">{post.date}</span>
                          </>
                        ) : null}
                      </span>
                      <span className={`mt-1 block text-sm leading-snug text-slate-950 ${post.boldTitle ? 'font-bold' : 'font-semibold'}`}>{post.title}</span>
                    </button>
                  )
                })}
              </div>

              {selectedBlogPost ? (
                <article
                  className="rounded-xl border-[3px] border-[#3982D5] bg-[#FBFDFF] p-5 shadow-[0_0_18px_rgba(57,130,213,0.16)] md:p-6 lg:sticky lg:top-8 lg:h-[var(--blog-list-height)] lg:overflow-y-auto"
                  style={{ '--blog-list-height': blogListHeight ? `${blogListHeight}px` : '42.5rem' }}
                >
                  <div className="border-b border-[#C2DBF0] pb-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#245F8F]">
                      {selectedBlogPost.category}
                      {selectedBlogPost.date ? ` · ${selectedBlogPost.date}` : ''}
                    </p>
                    <h3 className={`mt-2 text-xl leading-tight text-slate-950 md:text-2xl ${selectedBlogPost.boldTitle ? 'font-bold' : 'font-semibold'}`}>{selectedBlogPost.title}</h3>
                    <p className="mt-2 text-xs font-medium text-slate-500">{selectedBlogPost.readingTime}</p>
                  </div>
                  {selectedBlogPost.content.length > 0 ? (
                    <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                      {selectedBlogPost.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {selectedBlogPost.translationHref ? (
                    <div className="mt-5 border-t border-[#C2DBF0] pt-4">
                      {selectedBlogPost.journalHref ? (
                        <a
                          className="mr-2 inline-flex rounded-full border border-[#C2DBF0] px-3 py-1.5 text-xs font-medium text-[#245F8F] transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF]"
                          href={selectedBlogPost.journalHref}
                        >
                          Journal article · link coming soon
                        </a>
                      ) : null}
                      <a
                        className="inline-flex rounded-full border border-[#C2DBF0] px-3 py-1.5 text-xs font-medium text-[#245F8F] transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF]"
                        href={selectedBlogPost.translationHref}
                      >
                        اقرأ المقال بالعربية · العربية
                      </a>
                    </div>
                  ) : null}
                  {selectedBlogPost.imageSrc ? (
                    <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <img
                        alt={selectedBlogPost.imageAlt}
                        className="w-full object-cover"
                        src={selectedBlogPost.imageSrc}
                      />
                    </div>
                  ) : null}
                  {selectedBlogPost.videoId ? (
                    <section className="mt-6">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-slate-950">Full talk · {selectedBlogPost.readingTime}</h4>
                        <a
                          className="text-xs font-medium text-[#245F8F] hover:underline"
                          href={selectedBlogPost.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open on YouTube
                        </a>
                      </div>
                      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <iframe
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="aspect-video w-full"
                          src={`https://www.youtube.com/embed/${selectedBlogPost.videoId}`}
                          title={selectedBlogPost.title}
                        />
                      </div>
                    </section>
                  ) : null}
                  {selectedBlogPost.videos ? (
                    <div className="mt-6 space-y-6">
                      {selectedBlogPost.videos.map((video) => (
                        <section key={video.id}>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <h4 className="text-sm font-semibold text-slate-950">{video.label}</h4>
                            <a
                              className="text-xs font-medium text-[#245F8F] hover:underline"
                              href={video.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Open on YouTube
                            </a>
                          </div>
                          <div
                            className={`overflow-hidden rounded-lg border border-slate-200 bg-slate-950 ${
                              video.orientation === 'portrait' ? 'mx-auto max-w-[16rem]' : ''
                            }`}
                          >
                            <iframe
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className={video.orientation === 'portrait' ? 'aspect-[9/16] w-full' : 'aspect-video w-full'}
                              src={`https://www.youtube.com/embed/${video.id}`}
                              title={`${selectedBlogPost.title} — ${video.label}`}
                            />
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : null}
                </article>
              ) : null}
            </div>
          </Section>

          <Section eyebrow="Contact" id="contact">
            <div className="grid gap-4 md:grid-cols-2">
              <a className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2F7CBC]" href="mailto:mireille.elgheche@gmail.com">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</span>
                <span className="mt-2 block text-sm leading-7 text-slate-700">mireille.elgheche@gmail.com</span>
              </a>
              <a className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2F7CBC]" href="https://scholar.google.com/citations?user=yi46_McAAAAJ&hl=fr" rel="noreferrer" target="_blank">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Google Scholar</span>
                <span className="mt-2 block text-sm leading-7 text-slate-700">scholar.google.com/profile</span>
              </a>
              <a className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2F7CBC]" href="https://www.linkedin.com/in/mireille-el-gheche-a98aa140/" rel="noreferrer" target="_blank">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">LinkedIn</span>
                <span className="mt-2 block text-sm leading-7 text-slate-700">linkedin.com/profile</span>
              </a>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</span>
                <span className="mt-2 block text-sm leading-7 text-slate-700">Zurich, Switzerland</span>
              </div>
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}
