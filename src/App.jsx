import { useEffect, useState } from 'react'
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

const publications = [
  {
    group: 'Journal Papers',
    items: [
      {
        id: 'J9',
        text: 'P. Durr, M. El Gheche, et al., Outplaying elite table tennis players with an autonomous robot, Nature 652 (8111), 886-891, Apr. 2026.',
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
        text: 'M. El Gheche, G. Chierchia, J.-C. Pesquet, Proximity Operators of Discrete Information Divergences, IEEE Transactions on Information Theory, Vol. 64, No. 2, 1092-1104, Feb. 2018.',
        links: [{ label: 'arXiv', href: 'http://arxiv.org/abs/1606.09552' }],
      },
      {
        id: 'J4',
        text: 'G. Chierchia, M. El Gheche, G. Scarpa and L. Verdoliva, Multitemporal SAR Image Despeckling based on Block-Matching and Collaborative Filtering, IEEE Transactions on Geoscience and Remote Sensing, Vol. 55, No. 10, Pages 1-14, Jun. 2017.',
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
        links: [{ label: 'Springer', href: 'http://link.springer.com/article/10.1007/s10851-012-0361-z?null' }],
      },
    ],
  },
  {
    group: 'Conference Papers',
    items: [
      {
        id: 'C17',
        text: 'H. Petric Maretic, M. El Gheche, G. Chierchia, P. Frossard, fGOT: filter Graph distances using Optimal Transport, AAAI, Virtual Event, 22 Feb. - 1 Mar. 2022.',
      },
      {
        id: 'C16',
        text: 'M. Minder, Z. Farsijani, D. Shah, M. El Gheche, P. Frossard, FiGLearn: Filter and Graph Learning using Optimal Transport, ICASSP, Toronto, Ontario, Canada, 6-11 Jun. 2021.',
        links: [{ label: 'arXiv', href: 'http://arxiv.org/abs/2010.15457' }],
      },
      {
        id: 'C15',
        text: 'G. Chierchia and M. El Gheche, YAPA: Accelerated Proximal Algorithm for Convex Composite Problems, ICASSP, Toronto, Ontario, Canada, 6-11 Jun. 2021.',
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
      },
      {
        id: 'C5',
        text: 'M. El Gheche, A. Jezierska, J.-C. Pesquet and J. Farah, A Proximal Approach for Signal Recovery Based on Information Measures, EUSIPCO, Pages 1-5, Marrakech, Morocco, 9-13 Sep. 2013.',
      },
      {
        id: 'C4',
        text: 'M. El Gheche, J.-C. Pesquet and J. Farah, A Proximal Approach for Optimization Problems involving Kullback Divergences, ICASSP, Pages 5984-5988, Vancouver, Canada, 26-31 May 2013.',
      },
      {
        id: 'C3',
        text: 'M. El Gheche, C. Chaux, J.-C. Pesquet, J. Farah and B. Pesquet-Popescu, Disparity Map Estimation under Convex Constraints using Proximal Algorithms, SIPS, Pages 293-298, Beirut, Lebanon, 4-7 Oct. 2011.',
      },
      {
        id: 'C2',
        text: 'M. El Gheche, J.-C. Pesquet, C. Chaux, J. Farah et B. Pesquet-Popescu, Methodes Proximales pour l estimation du champ de disparite a partir d une paire d images stereoscopiques en presence de variations d illumination, GRETSI, Bordeaux, France, 5-8 Sep. 2011.',
      },
      {
        id: 'C1',
        text: 'M. El Gheche, J.-C. Pesquet, J. Farah, M. Kaaniche and B. Pesquet-Popescu, Proximal Splitting Methods for Depth Estimation, ICASSP, Pages 853-856, Prague, Czech Republic, 22-27 May 2011.',
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
    id: 'mireille-meaning',
    title: 'What does Mireille mean?',
    excerpt:
      '美礼 (みれい, Mi-rei) points to beauty with etiquette. Mireille, with its French-Provencal glow, leans toward wonder and admiration. A name with good manners and a spark.',
    action: 'Read note',
    content: [
      'Mirei can be written as 美礼 (みれい, Mi-rei): beauty and etiquette. I like the idea that grace is not only something you have, but something you practice in small gestures.',
      'To me, the name suggests a dignified, gentle presence: refined, attentive to detail, and quietly sensitive to beauty.',
      'Mireille adds its French and Provençal glow, often linked with wonder, admiration, and looking at the world with bright attention.',
      'So the short version is this: beauty, manners, curiosity, and a little sparkle.',
    ],
  },
  {
    id: 'physical-intelligence',
    title: 'When intelligence gets physical',
    excerpt:
      'Reflections on what changes when AI leaves the screen and has to perceive, move, adapt, and act reliably in the real world. There is a great future ahead, and we all have a role in shaping it.',
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
    id: 'favorite-ai-joke',
    title: 'Building smarter AI is easy. Teaching it sarcasm? Yeah, sure.',
    imageAlt: 'A comic about an AI trying to understand sarcasm.',
    imageSrc: '/ai-sarcasm-joke.png',
    action: 'Read joke',
    content: [],
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

  const selectedBlogPost = blogPosts.find((post) => post.id === selectedBlogPostId)
  const selectedBlogPostIndex = selectedBlogPost ? blogPosts.findIndex((post) => post.id === selectedBlogPost.id) : -1

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

        <main className="space-y-6">
          <section id="home" className="scroll-mt-6 overflow-hidden rounded-lg border border-[#C2DBF0] bg-white shadow-sm">
            <div className="border-t-4 border-[#3982D5] p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2F7CBC]">Profile</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
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
            <div className="space-y-4">
              {positions.map((position) => (
                <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={`${position.period}-${position.title}`}>
                  <p className="text-sm font-medium text-[#245F8F]">{position.period}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-950">{position.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{position.place}</p>
                </article>
              ))}
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
              <div className="border-t border-[#C2DBF0] pt-5">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    'Machine Learning',
                    'AI',
                    'Optimization',
                  ].map((item) => (
                    <div className="border-l-2 border-[#3982D5] pl-3 text-sm font-medium leading-6 text-slate-700" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section eyebrow="Blog" id="blog">
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3">
              {blogPosts.map((post) => (
                <button
                  aria-pressed={selectedBlogPost?.id === post.id}
                  className={`relative w-[82vw] max-w-[20rem] shrink-0 overflow-hidden rounded-lg border p-5 text-left transition hover:-translate-y-0.5 hover:border-[#2F7CBC] hover:shadow-sm md:w-auto md:max-w-none ${
                    selectedBlogPost?.id === post.id
                      ? 'border-[#8CBFE8] bg-[#F7FBFF] shadow-sm ring-1 ring-[#D6EAFB]'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                  key={post.title}
                  onClick={() => setSelectedBlogPostId(post.id)}
                  type="button"
                >
                  {selectedBlogPost?.id === post.id ? (
                    <span className="absolute inset-x-0 top-0 h-1 bg-[#3982D5]" aria-hidden="true" />
                  ) : null}
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#245F8F]">Essay</span>
                  <span className="mt-3 block text-xl font-semibold leading-snug text-slate-950">{post.title}</span>
                  <span className="mt-3 block text-sm leading-6 text-slate-700">{post.excerpt}</span>
                  <span className="mt-5 inline-flex rounded-full border border-[#C2DBF0] px-4 py-2 text-sm font-medium text-[#245F8F]">
                    {selectedBlogPost?.id === post.id ? 'Open' : post.action}
                  </span>
                </button>
              ))}
            </div>

            {selectedBlogPost ? (
              <>
                <div className="mt-2 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
                  {blogPosts.map((post, index) => (
                    <div className="flex justify-center" key={`${post.id}-connector`}>
                      {index === selectedBlogPostIndex ? <span className="h-6 w-px bg-[#8CBFE8]" /> : null}
                    </div>
                  ))}
                </div>

                <article className="rounded-lg border border-[#C2DBF0] bg-[#FBFDFF] p-4 shadow-sm md:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#245F8F]">Open essay</p>
                      <h3 className="mt-2 text-xl font-semibold leading-tight text-slate-950">{selectedBlogPost.title}</h3>
                    </div>
                    <button
                      className="shrink-0 rounded-full border border-[#C2DBF0] px-3 py-1 text-xs font-medium text-[#245F8F] transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF]"
                      onClick={() => setSelectedBlogPostId(null)}
                      type="button"
                    >
                      Minimize
                    </button>
                  </div>
                  {selectedBlogPost.content.length > 0 ? (
                    <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                      {selectedBlogPost.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
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
                    <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <iframe
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="aspect-video w-full"
                        src={`https://www.youtube.com/embed/${selectedBlogPost.videoId}`}
                        title={selectedBlogPost.title}
                      />
                    </div>
                  ) : null}
                  {selectedBlogPost.href ? (
                    <a
                      className="mt-5 inline-flex rounded-full border border-[#C2DBF0] px-4 py-2 text-sm font-medium text-[#245F8F] transition hover:border-[#2F7CBC] hover:bg-[#EDF6FF]"
                      href={selectedBlogPost.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open on YouTube
                    </a>
                  ) : null}
                </article>
              </>
            ) : null}
          </Section>

          <Section eyebrow="Contact" id="contact">
            <div className="grid gap-4 md:grid-cols-2">
              <a className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2F7CBC]" href="mailto:mireille.elgheche@gmail.com">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</span>
                <span className="mt-2 block text-slate-950">mireille.elgheche@gmail.com</span>
              </a>
              <a className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2F7CBC]" href="https://scholar.google.com/citations?user=yi46_McAAAAJ&hl=fr" rel="noreferrer" target="_blank">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Google Scholar</span>
                <span className="mt-2 block text-slate-950">scholar.google.com/profile</span>
              </a>
              <a className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2F7CBC]" href="https://www.linkedin.com/in/mireille-el-gheche-a98aa140/" rel="noreferrer" target="_blank">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">LinkedIn</span>
                <span className="mt-2 block text-slate-950">linkedin.com/profile</span>
              </a>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</span>
                <span className="mt-2 block text-slate-950">Zurich, Switzerland</span>
              </div>
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}
