\documentclass[11pt]{article}

% ============================================================
% Trust Signature Layer (TSL)
% Proof of Continuity for the AI Internet
% Founder / Protocol + Hyper-Specific Robust Implementation Specification Draft
% ============================================================

\usepackage[margin=0.85in]{geometry}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{lmodern}
\usepackage{microtype}
\usepackage{amsmath, amssymb, amsfonts, mathtools}
\usepackage{booktabs}
\usepackage{longtable}
\usepackage{tabularx}
\usepackage{array}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{hyperref}
\usepackage{listings}
\usepackage[most]{tcolorbox}
\usepackage{tikz}
\usepackage{caption}
\usepackage{float}
\usetikzlibrary{arrows.meta, positioning, shapes.geometric, fit, calc, backgrounds}

\hypersetup{
    colorlinks=true,
    linkcolor=blue!50!black,
    urlcolor=blue!55!black,
    citecolor=blue!55!black,
    pdftitle={Trust Signature Layer: Cryptographic Continuity Evidence - Core Architecture Corrected Specification v4},
    pdfauthor={TSL Protocol Draft},
    pdfsubject={A transport-independent continuity-evidence protocol with an open-source maintainer profile},
    pdfkeywords={continuity, cryptographic evidence, revocation, transparency log, open-source maintainers, release security}
}

\setlist[itemize]{topsep=3pt, itemsep=2pt, parsep=0pt, leftmargin=1.25em}
\setlist[enumerate]{topsep=3pt, itemsep=2pt, parsep=0pt, leftmargin=1.4em}
\renewcommand{\arraystretch}{1.16}
\setlength{\parindent}{0pt}
\setlength{\parskip}{6pt}
\sloppy

\definecolor{tslblue}{RGB}{28,79,150}
\definecolor{tslcyan}{RGB}{0,126,150}
\definecolor{tslgreen}{RGB}{20,122,75}
\definecolor{tslorange}{RGB}{178,93,0}
\definecolor{tslred}{RGB}{170,39,39}
\definecolor{tslgray}{RGB}{65,65,65}
\definecolor{codebg}{RGB}{248,248,248}
\definecolor{codeframe}{RGB}{221,221,221}
\definecolor{boxbg}{RGB}{249,251,255}

\lstdefinestyle{tslcode}{
    backgroundcolor=\color{codebg},
    frame=single,
    rulecolor=\color{codeframe},
    basicstyle=\ttfamily\small,
    breaklines=true,
    breakatwhitespace=false,
    showstringspaces=false,
    columns=fullflexible,
    keepspaces=true,
    tabsize=2
}

\newtcolorbox{thesisbox}{
    colback=blue!3,
    colframe=tslblue,
    arc=2mm,
    boxrule=0.7pt,
    title=Category Thesis
}

\newtcolorbox{principlebox}[1]{
    colback=green!3,
    colframe=tslgreen,
    arc=2mm,
    boxrule=0.65pt,
    title={#1}
}

\newtcolorbox{warningbox}[1]{
    colback=red!3,
    colframe=tslred,
    arc=2mm,
    boxrule=0.65pt,
    title={#1}
}

\newtcolorbox{marketbox}[1]{
    colback=orange!4,
    colframe=tslorange,
    arc=2mm,
    boxrule=0.65pt,
    title={#1}
}

\newcommand{\TSL}{\textsc{TSL}}
\newcommand{\TrustID}{\textsc{TrustID}}
\newcommand{\PoC}{\textsc{Proof of Continuity}}
\newcommand{\hash}{\operatorname{Hash}}
\newcommand{\commit}{\operatorname{Commit}}
\newcommand{\sign}{\operatorname{Sign}}
\newcommand{\verify}{\operatorname{Verify}}
\newcommand{\MerkleRoot}{\operatorname{MerkleRoot}}
\newcommand{\dist}{\operatorname{dist}}
\newcommand{\sigmoid}{\operatorname{sigmoid}}
\newcommand{\drift}{\operatorname{Drift}}
\newcommand{\attest}{\operatorname{Attest}}

\begin{document}

\begin{titlepage}
\thispagestyle{empty}
\centering
\vspace*{1.2cm}
{\Huge\bfseries Trust Signature Layer\par}
\vspace{0.35cm}
{\LARGE\bfseries Cryptographic Continuity Evidence\par}
\vspace{0.45cm}
{\large Core Architecture and Open-Source Maintainer Continuity Profile\par}
\vspace{0.85cm}
\rule{0.72\textwidth}{0.6pt}\par
\vspace{0.85cm}
{\large Founder / Protocol + Hyper-Specific Robust Implementation Specification Draft\par}
\vspace{0.2cm}
{\large May 2026\par}
{\large Core Architecture Corrected Variant v4\par}
\vspace{1.1cm}
\begin{minipage}{0.82\textwidth}
\centering
\large\itshape
Verify protocol evidence first. Assess only a named action under a named policy.
\end{minipage}
\vspace{1.0cm}

\begin{tcolorbox}[
    colback=blue!3,
    colframe=tslblue,
    boxrule=0.7pt,
    arc=2mm,
    width=0.88\textwidth,
    title=Executive Abstract
]
The Trust Signature Layer (\TSL) is a transport-independent evidence-envelope protocol for proving origin, key continuity, revocation state, and log inclusion without publishing private content by default. It is not an application, social network, inbox, marketplace, wallet, or advertising surface. Applications may carry signed envelopes and portable proof bundles; verifiers independently check canonical bytes, signatures, trusted time evidence, revocation state, cumulative-log proofs, and checkpoint settlement.

This specification separates a long-term protocol vision from an empirically testable first claim. The first normative evaluation domain is \textbf{open-source maintainer and release continuity}. In that domain, \TSL{} produces a domain-specific continuity or compromise-risk assessment for a particular release under a named policy. It does not produce a universal score of a person, organization, wallet, or agent. Other domains in this document are future profiles and must not be presented as validated until they have their own datasets, policies, calibration reports, and error analyses.
\end{tcolorbox}

\vfill
{\small Private draft. Not legal, investment, or security advice.}
\end{titlepage}

\tableofcontents
\newpage

% ============================================================
\section{The One-Line Pitch}
% ============================================================

\begin{thesisbox}
\TSL{} is a portable evidence layer for cryptographic continuity. Its first evaluable profile asks a narrow question: does a specific open-source release continue a maintainer's verified key, repository, and release trajectory under a declared policy?
\end{thesisbox}

\begin{principlebox}{Protocol, Not Application}
\TSL{} is not an application that users sign up for, browse, advertise on, or use as a destination. It is a protocol layer and trust-envelope standard that can be embedded beneath existing applications and above transport delivery. Web interfaces, browser extensions, wallets, dashboards, SDKs, and command-line tools are only reference clients for creating, carrying, resolving, and verifying \TSL{} proofs.
\end{principlebox}

The product does not ask the world to join another social network. It does not ask every company to rip out its communication stack. It does not require a new inbox, a new marketplace, or a new identity provider.

Instead, \TSL{} says:

\begin{quote}
\textbf{Keep every app. Add a trust settlement layer beneath them.}
\end{quote}

Any compatible application can carry a \TSL{} envelope. Every envelope can be verified independently. Verified events may contribute to a privacy-preserving, domain-scoped evidence graph, but only a named assessment profile may interpret that evidence, and every output must be auditable, challengeable, expiring, and selectively disclosed.

\begin{principlebox}{Research Thesis, Not Universal Claim}
When content and profiles are inexpensive to imitate, signed history, trusted time evidence, revocation, and reproducible release trajectories may provide useful continuity evidence. The first paper tests that proposition only for open-source maintainer and release continuity.
\end{principlebox}

% ============================================================
\section{Scientific Scope and Initial Evaluation Domain}
% ============================================================

\begin{warningbox}{No Universal Trust Claim}
\TSL{} does not measure human worth, honesty, lawfulness, or universal trustworthiness. A valid proof establishes protocol facts. A continuity provider may estimate a narrowly defined risk for a specified action, domain, policy, model version, and evidence window.
\end{warningbox}

The initial scientific target is \textbf{open-source maintainer continuity}. The assessment target is a concrete action such as a package release, release tag, repository ownership change, or maintainer-key transition. The first reference policy is \texttt{opensource\_release\_continuity.v1}. It asks whether the action is consistent with the verified public history available before the action and whether compromise-like signals require step-up review.

The first evaluation MUST use time-split, repository-split, and package-split datasets containing public release histories, maintainer transitions, key rotations, ownership changes, confirmed compromise incidents where available, and reproducible simulated takeover scenarios. The output is a calibrated domain-specific continuity or compromise-risk assessment, not a portable social rank. Anti-phishing, marketplaces, professional identity, customer support, and autonomous-agent profiles remain prospective until separately evaluated.

% ============================================================
\section{Why Now}
% ============================================================

The internet is entering a phase where the cost of manufacturing convincing identity signals is collapsing.

A malicious actor can now generate:

\begin{itemize}
    \item realistic profile pictures,
    \item polished bios,
    \item credible writing styles,
    \item fake resumes and credentials,
    \item synthetic references,
    \item cloned voices,
    \item fake customer support agents,
    \item fake sellers and buyers,
    \item fake software maintainers,
    \item fake AI agents,
    \item fake communities of accounts that vouch for each other.
\end{itemize}

The old trust stack was built for a slower internet:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} X}
\toprule
Old Primitive & Failure Mode in the AI Internet \\
\midrule
Username & Easy to impersonate or imitate \\
Profile picture & AI-generated or stolen \\
Verified badge & Platform-specific, often pay-to-play or policy-dependent \\
Email domain & Spoofable, compromised, or unfamiliar to users \\
Password login & Authenticates access, not trustworthiness \\
KYC & Expensive, invasive, not useful for pseudonymous ecosystems \\
Platform reputation & Trapped in silos; disappears when users change platforms \\
One-time credential & Says little about current behavior or compromise \\
\bottomrule
\end{tabularx}
\end{center}

The coming internet requires a different primitive:

\begin{quote}
\textbf{Can this identity prove a durable, hard-to-fake pattern of signed behavior over time?}
\end{quote}

\TSL{} is a candidate mechanism whose usefulness must be established by domain-specific evaluation.

% ============================================================
\section{The Category: Trust Settlement}
% ============================================================

Payments have settlement networks. Cloud has infrastructure layers. Identity has authentication providers. Communication has no equivalent trust settlement layer.

Today, every application tries to solve trust locally:

\begin{itemize}
    \item Gmail fights phishing inside Gmail.
    \item LinkedIn fights fake profiles inside LinkedIn.
    \item Marketplaces score sellers inside their marketplace.
    \item Wallets warn about scams inside wallet UX.
    \item AI platforms try to authenticate agents inside their own ecosystem.
\end{itemize}

This creates duplicated effort, weak portability, and fragmented trust.

\TSL{} proposes the following architectural category:

\begin{principlebox}{Trust Settlement}
Trust settlement is the process by which claims about identity continuity, key validity, revocation, interaction history, attestations, and risk assessments become portable, verifiable, and independent of any single application.
\end{principlebox}

As an architectural analogy rather than an empirical claim, the protocol aims to separate evidence settlement from application delivery:

\begin{itemize}
    \item applications initiate interactions,
    \item the trust layer settles continuity,
    \item verifiers check proofs,
    \item users retain portability,
    \item no single app owns the canonical trust history.
\end{itemize}

% ============================================================
\section{Design Goal: Below the Application Layer}
% ============================================================

The most important architectural decision is that \TSL{} should not become an integrations company. It should become a protocol company.

\begin{warningbox}{Wrong Architecture}
Build one custom integration for Gmail, another for Discord, another for LinkedIn, another for X, another for Slack, another for marketplaces, and another for agent frameworks. Each app becomes a special case.
\end{warningbox}

\begin{principlebox}{Right Architecture}
Make applications dumb carriers. The protocol should only require that a message, transaction, or agent action can carry a signed envelope or proof link. Identity, signatures, receipts, revocations, attestations, checkpoints, and verification live below the app.
\end{principlebox}

The application layer should answer:

\begin{quote}
How do I deliver this message or action?
\end{quote}

The \TSL{} layer should answer:

\begin{quote}
Who signed this? Is the key valid? Was the event committed? Has the identity been revoked? Does the interaction fit a trustworthy continuity pattern? What proof can be shown without exposing private content?
\end{quote}


% ============================================================
\section{Layer Placement: Below Applications, Above Transport}
% ============================================================

\TSL{} should be understood as a trust-envelope layer, not as a replacement for TCP, TLS, HTTP, SMTP, QUIC, or any specific application protocol. It does not deliver packets. It does not own the user interface. It does not require users to visit a new destination. It attaches verifiable trust semantics to messages and actions that are already moving through existing transports.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.28\textwidth} X}
\toprule
Layer & Role \\
\midrule
Application semantics & Email, chat, marketplace messages, wallet actions, API calls, support tickets, code releases, and AI-agent tool calls. \\
\TSL{} trust-envelope layer & Signed event commitments, \TrustID{} resolution, receipts, revocation checks, inclusion proofs, checkpoint verification, and optional signed continuity assessments. \\
Transport and security layer & HTTPS, TLS, QUIC, TCP/IP, SMTP, WebSockets, message queues, and other delivery mechanisms. \\
\bottomrule
\end{tabularx}
\end{center}

\begin{principlebox}{No Signup Destination}
The adoption goal is not to bring users into a new app. The adoption goal is to make existing applications and agents carry verifiable trust envelopes. In the mature version, \TSL{} should feel like TLS for trust: mostly invisible when present, obvious when missing, and independently verifiable when challenged.
\end{principlebox}

A typical flow is:

\begin{lstlisting}[style=tslcode]
user or agent creates ordinary message/action
  -> TSL client or SDK creates commitment
  -> TSL active key signs commitment
  -> envelope or proof link is attached to the message/action
  -> message travels over existing transport
  -> recipient verifier checks signature, key state, revocation, log inclusion, and checkpoint
  -> recipient sees continuity status and explanation
\end{lstlisting}

% ============================================================
\section{Protocol Stack}
% ============================================================

\begin{figure}[H]
\centering
\begin{tikzpicture}[
    node distance=0.75cm,
    layer/.style={rectangle, rounded corners, draw=tslblue, fill=blue!3, very thick, text width=13cm, align=left, inner sep=8pt},
    underlay/.style={rectangle, rounded corners, draw=tslgreen, fill=green!3, very thick, text width=13cm, align=left, inner sep=8pt},
    chain/.style={rectangle, rounded corners, draw=tslorange, fill=orange!4, very thick, text width=13cm, align=left, inner sep=8pt},
    arrow/.style={-{Latex[length=3mm]}, thick, draw=tslgray}
]
\node[layer] (apps) {\textbf{Application / Transport Layer}\\
Email, messaging apps, social networks, marketplaces, wallets, support tools, code platforms, AI-agent frameworks. Apps carry ordinary content plus optional \TSL{} envelopes or proof links.};
\node[underlay, below=of apps] (client) {\textbf{Transport-Independent \TSL{} Client Layer}\\
Browser extension, mobile wallet, desktop client, SDK, enterprise gateway, or agent sidecar. Signs events, verifies envelopes, stores private history, requests receipts, and displays trust explanations.};
\node[underlay, below=of client] (relay) {\textbf{Relay and Transparency Log Mesh}\\
Receives commitments, issues inclusion proofs, shards logs, maintains append-only Merkle structures, and batches checkpoints.};
\node[chain, below=of relay] (settlement) {\textbf{Blockchain Settlement Layer}\\
Identity registry, key registry, revocation registry, checkpoint registry, attestation registry, scoring-provider registry, and model-version registry.};
\node[chain, below=of settlement] (anchor) {\textbf{External Settlement / Data Availability Backends}\\
Ethereum L2s, app-rollups, alternative chains, Bitcoin timestamping, enterprise permissioned anchors, or future trust-settlement networks.};

\draw[arrow] (apps) -- node[right, font=\small]{message/action plus envelope} (client);
\draw[arrow] (client) -- node[right, font=\small]{commitments and receipts} (relay);
\draw[arrow] (relay) -- node[right, font=\small]{Merkle roots and state roots} (settlement);
\draw[arrow] (settlement) -- node[right, font=\small]{optional anchor / finality} (anchor);
\end{tikzpicture}
\caption{\TSL{} as a trust-envelope layer beneath application semantics and above ordinary transport delivery.}
\end{figure}

The key separation is simple:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.27\textwidth} X}
\toprule
Layer & Responsibility \\
\midrule
Application layer & Delivers messages, transactions, and agent calls \\
Client layer & Signs, verifies, stores private context, and renders trust UX \\
Relay/log layer & Batches commitments and provides inclusion proofs \\
Blockchain layer & Settles identity, revocation, checkpoints, attestations, and provider state \\
AI/graph layer & Estimates behavioral risk from local, disclosed, and aggregate evidence \\
Governance layer & Defines protocol upgrades, provider rules, appeals, and abuse controls \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Core Primitive: Proof of Continuity}
% ============================================================

\PoC{} is not a single score. It is a bundle of verifiable signals:

\begin{itemize}
    \item continuity of cryptographic keys,
    \item continuity of signed event history,
    \item continuity of counterparty receipts,
    \item continuity of graph position,
    \item continuity of attestations,
    \item continuity of behavioral trajectory,
    \item continuity of revocation and recovery state.
\end{itemize}

An identity can have a valid signature but still be risky. A compromised account can sign with a valid key. A bot can sign messages. A scammer can create a keypair. Therefore, \TSL{} separates authentication from trustworthiness.

\begin{warningbox}{Authentication Is Not Trust}
A valid signature proves that a key signed an event. It does not prove that the actor is safe, honest, human, uncompromised, or acting in good faith.
\end{warningbox}

The protocol's thesis is:

\begin{equation}
\text{Trust} \approx \text{valid origin} + \text{durable continuity} + \text{organic graph position} + \text{low adversarial similarity}.
\end{equation}

% ============================================================
\section{Canonical Objects}
% ============================================================

\subsection{TrustID}

A \TrustID{} is a portable cryptographic identity. It may represent a person, business, wallet, software package, AI agent, marketplace seller, organization, or pseudonymous account.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.identity.v1",
  "id": "did:tsl:eip155-8453:0xabc...",
  "controller": "smart_account_or_public_key",
  "created_at": "2026-05-25T00:00:00Z",
  "verification_methods": [
    {
      "id": "#device-key-1",
      "type": "ed25519",
      "public_key": "z6Mk...",
      "status": "active"
    }
  ],
  "recovery": {
    "type": "smart_account_recovery",
    "policy_commitment": "0x..."
  },
  "privacy_policy_commitment": "0x..."
}
\end{lstlisting}

The \TrustID{} should be compatible with decentralized identifier patterns, but \TSL{} should not depend on any single DID method. The protocol should expose a resolution abstraction:

\begin{lstlisting}[style=tslcode]
resolveTrustID(id) -> {
  controller,
  active_keys,
  revoked_keys,
  service_endpoints,
  policy_commitments,
  latest_checkpoint
}
\end{lstlisting}

\subsection{Event Commitment}

An event commitment is a signed claim that an interaction or action was issued. The raw content remains private by default. The signer-controlled time is named \texttt{issued\_at}; it is never treated as sufficient proof that the event existed at that time.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.event_commitment.v1",
  "event_class": "message | transaction | attestation | agent_call | code_release",
  "sender": "did:tsl:eip155-8453:0xabc...",
  "signing_key_id": "#device-key-1",
  "receiver_commitment": "H(receiver-domain || receiver_id || receiver_salt)",
  "content_commitment": "H(content-domain || content_hash || content_salt)",
  "metadata_commitment": "H(metadata-domain || private_metadata || metadata_salt)",
  "previous_event_commitment": "optional_hash",
  "issued_at": "2026-05-25T00:01:00Z",
  "nonce": "random_256_bit_nonce",
  "disclosure_policy": "commitment_only",
  "signature": "sender_signature_over_rfc8785_jcs_payload"
}
\end{lstlisting}

The protocol does not make \texttt{platform} a required public field. Platform-specific metadata remains private, optional, or selectively disclosed.

\subsection{Trusted Time Evidence and Backdating Resistance}

Three times have distinct meanings:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.23\textwidth} X}
\toprule
Time & Meaning \\
\midrule
\texttt{issued\_at} & Self-declared and signed by the event key. Useful for ordering and policy, but not a trusted timestamp. \\
\texttt{relay\_received\_at} & Time assigned and signed by a verifier-trusted relay when it first accepted the exact event commitment or issued an inclusion promise. \\
\texttt{checkpoint\_time} & Monotonic signed time of a cumulative log checkpoint. Settlement supplies an external upper bound and durable publication evidence. \\
\bottomrule
\end{tabularx}
\end{center}

A relay receipt binds the exact commitment to trusted receipt time:

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.relay_receipt.v1",
  "log_id": "tsl-log:00af",
  "commitment": "0x...",
  "relay_id": "did:tsl:relay:001",
  "relay_received_at": "2026-05-25T00:01:04Z",
  "promised_tree_size": 184294,
  "merge_by": "2026-05-25T00:06:04Z",
  "prior_checkpoint_hash": "0x...",
  "signature": "relay_signature"
}
\end{lstlisting}

Let \(t_i\) be \texttt{issued\_at}, \(t_r\) be a verified \texttt{relay\_received\_at}, \(t_c\) be the including \texttt{checkpoint\_time}, and \(t_v\) be the key's effective revocation time. Ordinary historical validity requires \(t_i \leq t_r \leq t_c\), bounded clock skew, the signing key active at trusted first observation, and either \(t_r<t_v\) or a separately trusted pre-revocation timestamp or inclusion promise for the same commitment. A self-declared \texttt{issued\_at} before \(t_v\) never rescues an event first presented after revocation.

A relay time is trusted only under an explicit verifier policy naming accepted relay keys, maximum clock error, freshness of revocation state, merge deadline, and audit/gossip requirements. A single accepted relay supplies a first-observation claim under that relay-honesty assumption; it does not create an objective global clock. High-assurance profiles SHOULD require a quorum of independent relay receipts or an approved external timestamp. Settlement proves durable publication no later than the accepted settlement evidence; it does not retroactively prove the exact wall-clock time asserted by a dishonest relay.

\subsection{Receipt Commitment and Graph Privacy}

The public log MUST NOT contain an exact receiver \TrustID{} or a stable globally reusable receiver identifier. The full signed receipt is private or selectively disclosed. A \texttt{receiver\_pairwise\_id} MUST be scoped to the relationship or authorized verifier, purpose, and rotation epoch; reusing it across unrelated domains is non-compliant. The cumulative public log stores only a salted opaque commitment to that receipt.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.receipt_commitment.v1",
  "event_commitment": "0x...",
  "receiver_pairwise_id": "did:tsl:pairwise:verifier-scoped-id",
  "signing_key_id": "#pairwise-receipt-key-1",
  "receipt_class": "received | replied | transacted | completed | disputed",
  "issued_at": "2026-05-25T00:02:00Z",
  "metadata_commitment": "H(receipt-metadata-domain || private_metadata || salt)",
  "signature": "receiver_pairwise_signature"
}
\end{lstlisting}

The public receipt-log leaf is:

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.receipt_log_entry.v1",
  "receipt_commitment": "H(receipt-log-domain || JCS(full_receipt) || fresh_256_bit_salt)"
}
\end{lstlisting}

The salt, full receipt, exact receiver identity, event link, and any proof binding the pairwise key to a canonical \TrustID{} stay local or are disclosed to an authorized verifier. A public relay accepts the opaque log entry and a policy-compliant anti-spam authorization; it MUST NOT require the full receipt merely to append the commitment. Public receipt commitments therefore prove existence and ordering without publishing the communication graph. Exact graph edges may be constructed only from local context, explicit selective disclosure, or a privacy-preserving aggregate proof. Opaque public receipt leaves alone MUST NOT be treated as known counterparty edges.

A single-signed event proves origin under the stated key and time evidence. A selectively disclosed co-signed receipt proves an interaction to the authorized verifier. Aggregate receipt claims require disclosed evidence or a registered zero-knowledge proof; the public log by itself does not reveal who interacted with whom.

\subsection{Attestation}

An attestation is a signed claim by one identity about another.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.attestation.v1",
  "issuer": "did:tsl:org:trusted-provider",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "attestation_class": "known_business | verified_maintainer | trusted_counterparty | scam_warning | org_member",
  "claim_commitment": "H(claim_body || salt)",
  "visibility": "public | selective | private",
  "issued_at": "2026-05-25T00:03:00Z",
  "expires_at": "2026-11-25T00:03:00Z",
  "signature": "issuer_signature"
}
\end{lstlisting}

Negative attestations require strict abuse controls: rate limits, evidence commitments, appeal channels, issuer accountability, and separation between warnings and definitive claims.

\subsection{Revocation Event}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.revocation.v1",
  "trust_id": "did:tsl:eip155-8453:0xabc...",
  "revoked_key": "z6MkOld...",
  "replacement_key": "z6MkNew...",
  "reason_class": "rotation | compromise | device_loss | policy_update",
  "issued_at": "2026-05-25T00:04:00Z",
  "effective_at": "2026-05-25T00:04:00Z",
  "signature": "controller_or_recovery_signature"
}
\end{lstlisting}

The signed \texttt{effective\_at} is a policy cutoff, while the revocation's relay receipt and checkpoint establish when the network learned the revocation. A controller MAY choose an earlier warning window after compromise, but it MUST NOT retroactively invalidate an event that already has trusted pre-cutoff receipt or checkpoint evidence. Verifiers MUST preserve both the event's trusted-time evidence and the revocation's trusted publication evidence.

\subsection{Batch Checkpoint}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.batch_checkpoint.v1",
  "log_id": "tsl-log:00af",
  "shard": "00af",
  "tree_size": 148292,
  "root_hash": "0x...",
  "checkpoint_time": "2026-05-25T00:05:00Z",
  "previous_tree_size": 147811,
  "previous_checkpoint_hash": "0x...",
  "settlement_backend": "eip155:8453",
  "settlement_tx": "0x...",
  "relay_id": "did:tsl:relay:001",
  "relay_signature": "0x..."
}
\end{lstlisting}

A checkpoint is a signed snapshot of one cumulative shard log. The checkpoint hash chain orders snapshots; RFC 9162 consistency proofs, not the hash chain alone, prove that the newer tree is an append-only extension of the older tree.

% ============================================================
\section{What Goes On-Chain}
% ============================================================

The blockchain is the settlement and control plane. It is not the database of private communications.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.30\textwidth} X}
\toprule
On-chain & Off-chain / Local \\
\midrule
TrustID registry & Raw messages \\
Current public keys & Attachments and media \\
Key rotation records & Exact private contact lists \\
Revocation records & Sensitive metadata \\
Cumulative checkpoint roots and tree sizes & Full event payloads \\
Optional registry-state commitments & Full communication graph \\
Scoring-provider registry & Feature vectors if not disclosed \\
Model-version registry & Local risk computation inputs \\
Appeal/governance hooks & Private user settings \\
\bottomrule
\end{tabularx}
\end{center}



\subsection{Normative Data-Placement Scope}

Because provider, model, and governance registries may exist on-chain, implementations MUST keep a strict data-placement boundary. The blockchain stores control-plane facts and commitments, not private evidence.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} X}
\toprule
Placement & Allowed Data \\
\midrule
On-chain & Registry identifiers, active-key commitments, revocation state, cumulative log checkpoint roots and tree sizes, optional registry-state commitments, provider IDs, model-card commitments, evaluation-report commitments, governance-policy commitments, and settlement timestamps. \\
Off-chain public & Proof bundles, transparency-log entries, inclusion proofs, schemas, public model cards, public evaluation reports, public audit findings, and public governance policies. \\
Local/private & Raw messages, salts, exact counterparties, private metadata, local relationship labels, private graph, private feature vectors, private notes, and undisclosed consent records. \\
Never on-chain & Raw content, exact private graph, private salts, protected attributes, IP addresses, user-agent fingerprints, precise location, biometric data, and private disclosure-consent contents. \\
\bottomrule
\end{tabularx}
\end{center}

If an implementation needs to reference private evidence from a public or on-chain object, it MUST use a salted commitment, Merkle root, accumulator commitment, encrypted pointer, or zero-knowledge proof. It MUST NOT publish the private evidence itself.

The chain should answer:

\begin{itemize}
    \item Who controls this \TrustID{}?
    \item Which keys are currently valid?
    \item Was this key revoked?
    \item Was this cumulative checkpoint and tree size committed before time \(T\)?
    \item Which cumulative log checkpoint and optional registry-state commitment were active?
    \item Which scoring provider signed this risk assessment?
    \item Which model version produced this assessment?
\end{itemize}

The chain should not answer:

\begin{itemize}
    \item What did the message say?
    \item Who exactly talked to whom?
    \item What is a user's full contact graph?
    \item What are the user's private behavioral features?
\end{itemize}

% ============================================================
\section{Ledger Architecture}
% ============================================================

\subsection{Normative Choice: Cumulative RFC 9162-Style Logs}

Each identity-prefix shard is one \textbf{cumulative append-only log}. Epochs are checkpoint publication intervals; they do not create independent trees and they do not reset leaf indices. This specification therefore rejects the alternative design of independent per-epoch Merkle trees chained only by checkpoint hashes.

\begin{principlebox}{One Append-Only Model}
For every shard, leaves are appended to a single ordered tree using the Merkle Tree Hash, inclusion-proof, and consistency-proof semantics of RFC 9162. A checkpoint identifies a tree size and root. Append-only history is proven from an earlier \((m,root_m)\) to a later \((n,root_n)\) with an RFC 9162 consistency proof, where \(m\leq n\).
\end{principlebox}

A typed leaf can commit an event, opaque receipt commitment, attestation, revocation, delegation, or other registered entry:

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.log_entry.v1",
  "entry_type": "event | receipt_commitment | attestation | revocation | delegation",
  "entry_commitment": "0x..."
}
\end{lstlisting}

The leaf input is the RFC 8785 JCS encoding of \texttt{tsl.log\_entry.v1}. The Merkle construction itself follows RFC 9162 exactly: leaf hash \(HASH(0x00\parallel leaf\_input)\), internal node hash \(HASH(0x01\parallel left\parallel right)\), and RFC-defined handling of non-power-of-two tree sizes. Implementations MUST NOT substitute a custom odd-node duplication or promotion rule.

\subsection{Shard Assignment and Checkpoint Cadence}

Shards are stable identity-prefix partitions:

\begin{equation}
\text{shard}(i)=\operatorname{prefix}_{k}(\operatorname{SHA256}(\operatorname{utf8}(\TrustID_i))).
\end{equation}

Identity-scoped entries such as events, key transitions, attestations, and revocations use the relevant public identity prefix. Opaque receipt-log entries MUST instead use a commitment-derived privacy shard, for example \(\operatorname{prefix}_k(\operatorname{SHA256}(receipt\_commitment))\), so the public shard identifier does not reveal the receiver's \TrustID{} prefix or the linked event's shard. The shard rule is part of the log profile and MUST be deterministic.

The epoch or checkpoint interval is operational metadata only. Closing a five-minute interval publishes a new checkpoint for the current cumulative tree size; the next interval continues at the next leaf index in the same tree.

\begin{lstlisting}[style=tslcode]
client signs event
  -> relay verifies schema, signature, key state, and trusted-time policy
  -> relay issues signed relay receipt / inclusion promise
  -> relay appends typed commitment to cumulative shard log
  -> log returns RFC 9162 inclusion proof at tree_size n
  -> checkpoint publishes (log_id, tree_size n, root_hash, checkpoint_time)
  -> auditor verifies consistency from previous tree size to n
  -> checkpoint is periodically anchored to a settlement backend
\end{lstlisting}

\subsection{Threat Model of the Chosen Design}

A cumulative log gives verifiers a direct append-only claim: all leaves in the older tree are a prefix of the newer tree. Checkpoint hash chaining remains useful for ordering and equivocation detection but is not accepted as a substitute for a consistency proof. Independent epoch trees would prove only inclusion inside one epoch unless an additional authenticated cross-epoch structure were specified; that design is out of scope for v1.

Auditors gossip signed checkpoints, request consistency proofs between observed tree sizes, and publish a conflict if a relay signs incompatible roots for the same log and tree size or cannot prove consistency between monotonic sizes. The security assumption is that at least one honest auditor or verifier compares views.

\subsection{Scale Path}

The cumulative logs may be operated by a relay mesh and later committed by an application-specific rollup. Scaling changes ordering, data availability, or settlement adapters; it MUST NOT change RFC 9162 leaf, inclusion, consistency, or checkpoint semantics for the declared log version.

\subsection{Multi-Backend Verification}

A verifier calls:

\begin{lstlisting}[style=tslcode]
verifyCommitment(event, relay_receipt, inclusion_proof, checkpoint, consistency_context)
  -> VerificationResult
\end{lstlisting}

Settlement may occur on an L2, app-rollup, alternative chain, or approved timestamping backend. The settlement adapter is separate from the cumulative-log proof.

% ============================================================
\section{No-Integration Distribution}
% ============================================================

No-integration distribution means \TSL{} can propagate through existing channels before platforms add native support. The protocol should succeed first as an envelope, proof link, SDK, and verifier, not as a new place users must visit.


The protocol should work even when platforms do nothing.

\subsection{Proof Links}

Any message can carry a proof link:

\begin{lstlisting}[style=tslcode]
https://verify.tsl.network/p/bafy...
tsl://proof/bafy.../event
\end{lstlisting}

This is the zero-integration wedge. A user or agent can attach a proof link to email, LinkedIn, Discord, Slack, Telegram, X, GitHub, a marketplace chat, API payload, or agent transcript. The proof link is not a destination product; it is a portable verification artifact.

\subsection{Standard Envelope}

Applications that want native support can embed a standard envelope.

\begin{lstlisting}[style=tslcode]
{
  "tsl_envelope": {
    "version": "1.0",
    "event_commitment": "0x...",
    "sender": "did:tsl:eip155-8453:0xabc...",
    "signature": "0x...",
    "proof_uri": "ipfs://...",
    "checkpoint": "0x...",
    "disclosure_policy": "commitment_only"
  }
}
\end{lstlisting}


\subsection{Portable Proof Bundle}

A proof link SHOULD resolve to a portable proof bundle. The bundle is the implementation anchor for offline verification, browser-extension rendering, enterprise archival, and third-party audit. A verifier MUST be able to ignore optional members it does not understand while still enforcing the version rules for any object it verifies.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.proof_bundle.v1",
  "bundle_id": "0x...",
  "created_at": "2026-05-26T00:00:00Z",
  "envelope": {"type": "tsl.event_commitment.v1"},
  "proof": {"type": "tsl.inclusion_proof.v1"},
  "checkpoint": {"type": "tsl.batch_checkpoint.v1"},
  "identity": {"type": "tsl.identity.v1"},
  "receipts": [],
  "attestations": [],
  "revocations": [],
  "assessment": null,
  "assessment_v2": null,
  "zk_proofs": [],
  "delegations": [],
  "audit_findings": [],
  "governance_policy": {},
  "redaction_manifest": {
    "raw_content_included": false,
    "exact_counterparties_included": false,
    "receipt_graph_disclosed": false,
    "metadata_fields_redacted": ["platform", "ip_address", "user_agent"]
  }
}
\end{lstlisting}

The bundle MUST NOT include raw content, exact private counterparties, receipt-to-event links, pairwise identity bindings, salts, private graph features, or restricted metadata unless the subject or authorized controller has given explicit disclosure consent under the privacy consent rules. The \texttt{redaction\_manifest} is normative for UI and audit: it tells the verifier which fields were intentionally absent, not merely missing.

\subsection{Reference Clients and Interfaces}

Reference clients and protocol interfaces can be:

\begin{itemize}
    \item browser extension,
    \item mobile wallet,
    \item desktop app,
    \item enterprise gateway,
    \item SDK embedded in applications,
    \item AI-agent sidecar,
    \item command-line verifier for developers.
\end{itemize}

The client performs:

\begin{itemize}
    \item key generation,
    \item signing,
    \item local encrypted storage,
    \item envelope detection,
    \item inclusion verification,
    \item revocation checks,
    \item receipt requests,
    \item domain-specific assessment rendering,
    \item selective disclosure.
\end{itemize}

\subsection{Relay API}

\begin{lstlisting}[style=tslcode]
POST /v1/commitments
GET  /v1/proofs/{commitment}
GET  /v1/proof-bundles/{bundle_id}
POST /v1/receipt-commitments
GET  /v1/identity/{trust_id}
GET  /v1/revocation/{trust_id}
POST /v1/attestations
GET  /v1/checkpoints/{shard}/{tree_size}
GET  /v1/scoring-profiles/{profile_id}
GET  /v1/model-cards/{model_id}
POST /v1/delegations/verify
POST /v1/verify
\end{lstlisting}

This is how \TSL{} avoids app-by-app sprawl. Every product integrates with the same substrate.

% ============================================================
\section{Identity, Recovery, and Smart Accounts}
% ============================================================

Human users cannot be expected to manage raw private keys perfectly. \TSL{} should support several custody modes:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} X}
\toprule
Mode & Use Case \\
\midrule
Local keypair & Developers, power users, pseudonymous identities \\
Passkey-backed key & Consumer onboarding and device-bound signing \\
Smart account & Recovery, policy, session keys, delegated signing \\
Enterprise account & Organizations, teams, support desks, agent fleets \\
Agent account & Scoped authority for autonomous agents and bots \\
Hardware key & High-value identities and maintainers \\
\bottomrule
\end{tabularx}
\end{center}

Smart accounts are especially important because \TSL{} needs:

\begin{itemize}
    \item key rotation without identity loss,
    \item social or institutional recovery,
    \item multi-device signing,
    \item organization-managed subkeys,
    \item scoped agent keys,
    \item delegated session keys,
    \item revocation of compromised devices,
    \item sponsored gas for ordinary users.
\end{itemize}

\begin{principlebox}{Recovery Principle}
A user should be able to lose a device without losing years of continuity. A user should be able to revoke a compromised key without erasing trustworthy history.
\end{principlebox}

% ============================================================
\section{Privacy Model}
% ============================================================

\TSL{} must be private by default. A trust protocol that becomes a surveillance protocol will fail technically, socially, and legally.

\subsection{Privacy Levels}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.18\textwidth} X X}
\toprule
Level & Publicly Visible & Private / Local \\
\midrule
Level 0: Local only & Nothing & Raw messages, metadata, graph, scoring \\
Level 1: Commitments & Hashes, timestamps, signatures, roots & Message content, counterparties, metadata \\
Level 2: Selective proof & Specific disclosed claim & Everything outside the claim \\
Level 3: Aggregate proof & Counts, ranges, thresholds & Exact counterparties and messages \\
Level 4: Public identity & Public attestations and optional domain-specific assessment & Any non-disclosed private context \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Commitments}

For message \(m\), metadata \(\mu\), receiver identity \(r\), and salts \(s_m, s_\mu, s_r\):

\begin{align}
    c_m &= \hash(\text{domain} \parallel m \parallel s_m), \\
    c_\mu &= \hash(\text{metadata-domain} \parallel \mu \parallel s_\mu), \\
    c_r &= \hash(\text{receiver-domain} \parallel r \parallel s_r).
\end{align}

Salting and domain separation prevent common correlation and preimage attacks against predictable content.

\subsection{Selective Disclosure}

A user should be able to prove statements such as:

\begin{itemize}
    \item I have controlled this \TrustID{} for more than two years.
    \item This message belongs to a signed continuity chain.
    \item I have more than 50 reciprocal receipts.
    \item This business key is not revoked.
    \item This agent action was signed under a valid delegation.
    \item This seller has completed more than 100 transactions without disclosing buyer identities.
\end{itemize}



\subsection{Privacy Consent Enforcement Rules}

Privacy policy is not only a statement; it is an implementation gate. A compliant client MUST enforce disclosure consent before exporting proof bundles, uploading feature inputs, or revealing private metadata to a provider.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.25\textwidth} X}
\toprule
Control & Required Behavior \\
\midrule
Consent record & Store a signed or locally encrypted \texttt{tsl.disclosure\_consent.v1} record with subject, verifier, field classes, purpose, expiry, and revocation pointer. \\
Local block & If consent is absent, the client MUST block raw messages, salts, exact counterparties, private notes, protected attributes, IP addresses, user agents, and precise location from leaving local storage. \\
Upload filter & Provider uploads MUST be produced through an allowlist transform, not a denylist transform. Fields not explicitly allowed are omitted. \\
Bundle redaction & Proof bundles MUST include a \texttt{redaction\_manifest} listing omitted sensitive classes and MUST NOT include salts unless the verifier is authorized to open a commitment. \\
User warning & Before disclosure, UX MUST state what will be revealed, to whom, for what purpose, for how long, and whether the disclosure can increase correlation risk. \\
Revocation & A subject MAY revoke future disclosures. Past third-party copies cannot be technically erased, so the UX MUST not imply retroactive deletion. \\
\bottomrule
\end{tabularx}
\end{center}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.disclosure_consent.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "verifier_or_provider": "did:tsl:provider:continuity-labs",
  "allowed_field_classes": ["aggregate_counts", "receipt_thresholds", "attestation_status"],
  "forbidden_field_classes": ["raw_content", "exact_counterparties", "protected_attributes", "ip_address"],
  "purpose": "opensource_release_continuity_assessment",
  "issued_at": "2026-05-26T00:00:00Z",
  "expires_at": "2026-06-26T00:00:00Z",
  "revocation_pointer": "0x...",
  "signature": "subject_or_controller_signature"
}
\end{lstlisting}

\subsection{Zero-Knowledge Roadmap}

Later versions can add zero-knowledge proofs for threshold and set-membership claims:

\begin{itemize}
    \item prove age over threshold without revealing exact creation time,
    \item prove reciprocal interaction count without revealing counterparties,
    \item prove membership in a vetted organization without revealing internal records,
    \item prove absence from a revocation set,
    \item prove distance from known malicious clusters using privacy-preserving approximations,
    \item prove an agent operated within delegated scope.
\end{itemize}

% ============================================================
\section{Domain-Specific Evidence Graph and Behavioral Geometry}
% ============================================================

Let \(G_t = (V_t, E_t)\) be a domain-scoped evidence graph at time \(t\). For the initial open-source profile, nodes represent maintainer, repository, package, release-key, and release identities. Edges come only from verified public release facts, selectively disclosed receipts, attestations, repository or registry control evidence, and explicit local context. Opaque public receipt commitments do not reveal graph edges.

Each identity has a behavioral history:

\begin{equation}
H_i(t) = \{e_{i,1}, e_{i,2}, \ldots, e_{i,n(t)}\}.
\end{equation}

A feature extractor maps the identity, graph, and history into a latent vector:

\begin{equation}
    x_i(t) = \phi(v_i, G_t, H_i(t), A_i(t), R_i(t)),
\end{equation}

where \(A_i(t)\) is the attestation set and \(R_i(t)\) is revocation/recovery state.

\subsection{Feature Families}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} X}
\toprule
Feature Family & Example Signals \\
\midrule
Cryptographic & valid signatures, key age, rotations, revocations, delegation scope \\
Temporal & account age, activity cadence, burstiness, dormant reactivation, response latency \\
Graph & degree, reciprocity, clustering, PageRank, trusted-neighbor ratio, community diversity \\
Receipts & co-signed interactions, completed transactions, disputes, counterparty diversity \\
Attestations & issuer quality, claim freshness, negative warnings, organizational membership \\
Behavioral drift & sudden target change, outbound spike, language/style shift if permitted \\
Adversarial proximity & similarity to known scam/Sybil/bot clusters \\
Local context & prior relationship with verifier, personal allowlist, private history \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Research Risk Geometry (Non-Normative)}

Let \(\mathcal{M}_C\) denote observed continuity trajectories in the selected domain and \(\mathcal{M}_A\) denote confirmed or simulated compromise and takeover trajectories. These distributions are dataset-dependent research constructs, not protocol truth.

\begin{align}
    D_C(i,t) &= \dist(x_i(t), \mathcal{M}_C), \\
    D_A(i,t) &= \dist(x_i(t), \mathcal{M}_A), \\
    \drift_i(t) &= \left\|x_i(t) - x_i(t-\Delta t)\right\|.
\end{align}

A research model may estimate action-specific compromise risk:

\begin{equation}
p_{risk}(a,t \mid d,policy,model)=\sigmoid\left(
    \alpha D_A(a,t)
    -\beta D_C(a,t)
    +\gamma \drift_a(t)
    -\delta \attest_a(t)
    +\eta R_a(t)
\right).
\end{equation}

The result is meaningful only for the named action, domain, policy, model version, and calibration set. It is not a universal property of the subject.

\begin{warningbox}{Research Math vs. Canonical Implementation}
The manifold, sigmoid, entropy, covariance, Mahalanobis-distance, and AUROC/ECE formulas in this section are research and evaluation notation. They describe model intent and audit criteria, not signed wire-format arithmetic. A reference implementation MUST emit signed protocol objects using deterministic fixed-point integers, usually basis points or milli-units, and MUST define exact rounding in the algorithm registry and test vectors. Real-valued equations MAY guide model development, but they are not canonical serialization rules.
\end{warningbox}

\subsection{Reference Open-Source Continuity Profile}

Cryptographic validity and trusted-time validity are hard gates. They are not weighted inputs. If schema, canonicalization, signature, key, revocation, trusted-time binding, inclusion, or required checkpoint checks fail, the verifier returns the corresponding protocol failure and no ordinary continuity value.

For a cryptographically valid open-source release, the first transparent research profile may combine only domain-specific evidence:

\begin{align}
\operatorname{continuity\_evidence} ={}&
    0.18 \cdot \operatorname{maintainer\_key\_lineage} \\
& + 0.20 \cdot \operatorname{signed\_release\_history} \\
& + 0.12 \cdot \operatorname{reviewer\_or\_co\_maintainer\_evidence} \\
& + 0.12 \cdot \operatorname{repository\_and\_registry\_control\_continuity} \\
& + 0.07 \cdot \operatorname{counterparty\_and\_community\_diversity} \\
& + 0.07 \cdot \operatorname{maintainer\_attestation\_quality} \\
& + 0.07 \cdot \operatorname{release\_cadence\_consistency} \\
& + 0.10 \cdot \operatorname{change\_set\_and\_dependency\_continuity} \\
& + 0.07 \cdot \operatorname{local\_verifier\_policy}.
\end{align}

The profile then applies separately declared compromise and drift penalties and a calibration function fitted on time-split data. The initial profile assigns zero weight to recursive neighbor reputation. A later profile MAY use governed neighbor mass only under the convergence, seed-governance, and sensitivity rules below.

Reference output labels describe the release assessment, not the actor:

\begin{center}
\begin{tabular}{ll}
\toprule
Continuity evidence & Release label \\
\midrule
90--100 & Strong continuity evidence \\
75--89 & Likely continuous \\
55--74 & Mixed continuity evidence \\
35--54 & Unknown / step-up recommended \\
15--34 & Elevated compromise risk \\
0--14 & High compromise risk \\
Special & Cryptographic failure / revoked / insufficient evidence \\
\bottomrule
\end{tabular}
\end{center}

% ============================================================
\section{Continuity Assessment as a Signed Object}
% ============================================================

A continuity assessment is a signed, expiring claim about a specific action under a specific domain policy. It MUST identify the target event, policy, evidence window, model version, calibration report, and uncertainty. It MUST NOT be displayed as a universal trust score.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.continuity_assessment.v1",
  "target_event_commitment": "0xrelease...",
  "subject": "did:tsl:maintainer:alice",
  "issuer": "did:tsl:provider:continuity-labs",
  "domain": "opensource_maintainer_continuity",
  "policy_id": "opensource_release_continuity.v1",
  "continuity_bps": 8200,
  "label": "likely_continuous",
  "model_version": "opensource-continuity-v0.1.0",
  "evidence_commitment": "0x...",
  "features_disclosed": [
    "valid_release_signature",
    "verified_key_lineage",
    "release_history_consistency"
  ],
  "explanation": [
    "Release signature and trusted-time binding passed",
    "Maintainer key rotation has a valid recovery link",
    "Release history is consistent with the pre-action baseline",
    "No active revocation or confirmed compromise warning"
  ],
  "issued_at": "2026-05-25T00:05:00Z",
  "expires_at": "2026-06-01T00:05:00Z",
  "signature": "provider_signature"
}
\end{lstlisting}

\begin{principlebox}{Plural, Domain-Bound Assessments}
The protocol permits multiple providers and local policies. Every provider must bind an assessment to a domain and target action. The base protocol settles evidence and never requires a single reputation oracle.
\end{principlebox}

% ============================================================
\section{Domain-Specific Continuity Assessment Science: Hyper-Specific Normative Implementation}
% ============================================================

The base protocol proves signed facts. The scoring layer estimates contextual risk from those facts. A compliant implementation MUST preserve the following invariant:

\begin{equation}
\text{Protocol validity} \neq \text{trustworthiness} \neq \text{humanity} \neq \text{lawfulness}.
\end{equation}

A \TSL{} verifier MUST first compute cryptographic validity. A domain-specific model MAY then compute a signed continuity or risk assessment for the target action. A failed cryptographic gate MUST NOT be repaired by a high assessment value.

\begin{principlebox}{Robust Variant}
The robust implementation is not one global reputation score. It is a set of domain-specific, signed, calibrated, expiring assessments over versioned evidence profiles and explicitly named target actions. The protocol settles evidence; scoring providers compete on accuracy, calibration, privacy, auditability, and appeal quality.
\end{principlebox}

\subsection{Three Implementation Variants}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.20\textwidth} p{0.24\textwidth} X}
\toprule
Variant & Use & Required Properties \\
\midrule
MVP transparent scorer & Early demos, proof links, private beta & Hand-weighted features, no raw private data, signed domain-specific assessments, expiration, local override, explicit insufficient-evidence labels. \\
Production calibrated scorer & Enterprise APIs, marketplaces, agent workflows & Versioned feature registry, domain thresholds, time-split evaluation, calibration report, confidence interval, appeal path, provider registry entry. \\
High-assurance scorer & Banking, large payments, supply chain, regulated workflows & Independent audit, red-team pass, shadow deployment before promotion, privacy leakage report, reproducible evaluation package, emergency rollback, human review for severe negative labels. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Hard Gates Before Any Assessment Value}

The verifier computes a gate vector:

\begin{equation}
g_i=(schema,canon,sig,key,revocation,time\_binding,inclusion,checkpoint,settlement,delegation).
\end{equation}

The default hard gate is:

\begin{equation}
G_i=schema\land canon\land sig\land key\land \neg revocation\land time\_binding\land inclusion\land checkpoint.
\end{equation}

If the verifier policy requires chain finality, then:

\begin{equation}
G_i^{settled}=G_i\land settlement.
\end{equation}

An assessment provider MUST return one of the following before producing an ordinary continuity value:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.28\textwidth} X}
\toprule
Gate Outcome & Required Behavior \\
\midrule
Valid core proof & Numeric continuity assessment MAY be computed. \\
Invalid signature & Return \texttt{cryptographic\_failure}; no ordinary continuity value. \\
Revoked key or failed trusted-time binding & Return \texttt{revoked\_or\_compromised} or \texttt{time\_binding\_failure}; no ordinary assessment value. \\
Missing inclusion proof & Return \texttt{unsettled\_or\_unproven}; ordinary assessment value is suppressed under the reference policy. \\
Settlement required but absent & Return \texttt{settlement\_missing}; verifier policy decides accept or reject. \\
Delegation absent for agent action & Return \texttt{delegation\_missing}; no action authorization. \\
Sparse evidence but no adverse signal & Return \texttt{insufficient\_evidence}, not \texttt{suspicious}. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Domain Policies}

Every assessment MUST be bound to a domain policy. The same evidence may imply a different action under another policy. The first normative policy is open-source release continuity; all other rows are future research profiles.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.domain_policy.v1",
  "domain": "opensource_maintainer_continuity",
  "policy_version": "opensource-release-continuity-2026-06",
  "target_action_class": "code_release",
  "requires_settlement": true,
  "requires_trusted_time_binding": true,
  "requires_content_opening": false,
  "max_assessment_age_seconds": 86400,
  "false_positive_cost_class": "high",
  "false_negative_cost_class": "high",
  "sparse_identity_default": "insufficient_evidence",
  "default_action_on_drift": "step_up",
  "accepted_provider_status": ["active", "probation_allowed"],
  "human_review_required_labels": ["high_compromise_risk", "public_negative_claim"]
}
\end{lstlisting}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.25\textwidth} p{0.19\textwidth} X}
\toprule
Profile & Status & Required Claim Discipline \\
\midrule
Open-source maintainer continuity & Normative initial domain & Assess one release or control transition; use step-up rather than accusation for unexplained drift. \\
Anti-phishing & Future profile & Requires separate message datasets, relationship policy, and calibration. \\
Marketplace trust & Future profile & Requires transaction-specific outcomes and appealable seller/buyer policy. \\
Agent payments & Future profile & Requires delegation, value limits, and settlement-specific testing. \\
Professional identity / customer support & Future profile & Requires defamation, privacy, and organizational-authority review. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Scoring Profile Object}

A scoring profile is the executable contract between provider, verifier, auditor, and user.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.scoring_profile.v2",
  "profile_id": "did:tsl:provider:continuity-labs/profile/opensource-continuity-v0.1.0",
  "provider": "did:tsl:provider:continuity-labs",
  "domain": "opensource_maintainer_continuity",
  "model_family": "transparent_weighted_logistic",
  "model_version": "0.1.0",
  "feature_registry_uri": "ipfs://bafy.../feature_registry.json",
  "feature_registry_commitment": "0x...",
  "normalization_profile_commitment": "0x...",
  "weight_profile_commitment": "0x...",
  "calibration_profile_commitment": "0x...",
  "threshold_policy_commitment": "0x...",
  "privacy_policy_commitment": "0x...",
  "evaluation_report_commitment": "0x...",
  "training_data_statement_commitment": "0x...",
  "appeal_policy_uri": "https://provider.example/appeals/opensource-continuity-v0",
  "issued_at": "2026-05-26T00:00:00Z",
  "valid_after": "2026-05-26T00:00:00Z",
  "expires_at": "2026-08-26T00:00:00Z",
  "signature": "provider_signature"
}
\end{lstlisting}

\subsection{Feature Definition Schema}

Every feature MUST be named, typed, normalized, privacy-classified, and attack-modeled.

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.feature_definition.v2",
  "feature_id": "graph.reciprocity_bps.v1",
  "name": "reciprocity_bps",
  "family": "graph",
  "raw_definition": "2*min(w_ij,w_ji)/(w_ij+w_ji+eps) aggregated over counterparties",
  "value_type": "integer_bps",
  "range": [0, 10000],
  "direction": "higher_is_safer",
  "required_evidence": ["verified_receipts"],
  "forbidden_inputs": ["raw_message", "exact_private_counterparty_without_consent"],
  "normalizer_id": "bounded_ratio_identity_v1",
  "default_weight_bps": 1200,
  "missing_value_policy": "impute_zero_with_coverage_penalty",
  "stability_window_days": 90,
  "privacy_class": "aggregate",
  "audit_level": "recomputable_from_disclosed_or_provider_visible_evidence",
  "known_attacks": ["receipt_farming", "collusive_counterparties", "replay_attempts"],
  "mitigations": ["counterparty_diversity", "seed_escape", "temporal_decay"]
}
\end{lstlisting}

\subsection{Exact Reference Feature Set}

Let \(i\) be the subject, \(t\) be the assessment time, \(e\) be a verified event, \(c_e\) be its class, \(\tau_e\) be its verified relay or checkpoint time under policy, and \(\omega_e(t)\) be its effective graph weight. Let \(\varepsilon=10^{-9}\).

\begin{longtable}{>{\bfseries}p{0.24\textwidth} p{0.26\textwidth} p{0.40\textwidth}}
\toprule
Feature & Formula & Implementation Rule \\
\midrule
Protocol gate (not a feature) & \(G_i\in\{0,1\}\) & Evaluated before feature extraction. If zero, emit only a failure assessment. \\
Identity age & \(1-e^{-\min(a_i,730)/180}\) & \(a_i\) is age in days since registry creation or verified local creation. \\
Active key age & \(1-e^{-\min(k_i,365)/90}\) & Recent key age is downweighted unless rotation has valid recovery proof. \\
Signed event count & \(\frac{\log(1+n_i)}{\log(1+1000)}\) clipped & Counts only valid, non-replayed, included events. \\
Receipt count & \(\frac{\log(1+r_i)}{\log(1+300)}\) clipped & Counts only co-signed receipts whose counterparties are distinct after clustering. \\
Reciprocity & \(\frac{\sum_j \min(w_{ij},w_{ji})}{\sum_j \max(w_{ij},w_{ji})+\varepsilon}\) & One-way broadcasts do not become strong continuity. \\
Counterparty diversity & \(1-\sum_j p_{ij}^2\) & Uses capped evidence-weighted edge mass; penalizes closed farms. \\
Community escape & \(\frac{\sum_{j:comm(j)\neq comm(i)}w_{ij}}{\sum_jw_{ij}+\varepsilon}\) & Low escape is a Sybil warning when paired with density and synchronization. \\
Trusted neighbor mass & \(T_i^*\) from the governed damped fixed-point process below & Disabled in the initial profile; any later use requires a signed seed manifest, convergence, damping, and sensitivity report. \\
Dispute rate & \(\frac{d_i}{r_i+d_i+\varepsilon}\) & Disputes require evidence commitments and appeal state. \\
Attestation quality & \(\operatorname{clip}_{0,1}\sum_a Q_a\kappa_a d_a\) & Expired and reversed attestations contribute zero or negative weight. \\
Revocation risk & \(\mathbb{I}[recent\ compromise]\) & Triggers warning window after compromise event. \\
Cadence stability & \(1-\operatorname{clip}_{0,1}(MADZ_i/8)\) & Robust z-score over activity intervals. \\
Dormant reactivation & \(\mathbb{I}[inactive>90d \land burst>p95]\) & Step-up trigger, not automatic fraud. \\
Adversarial proximity & \(e^{-D_A^2/\sigma_A^2}\) & Risk penalty; must disclose cluster source class. \\
Local relationship & private verifier value & MUST remain local unless user discloses. \\
\bottomrule
\end{longtable}

All clipped features are clipped to \([0,1]\). Output features stored in protocol objects SHOULD be represented as integer basis points from \(0\) to \(10000\).

\subsection{Recursive Neighbor Mass: Convergence and Seed Governance}

A provider MUST NOT define \texttt{trusted\_neighbor\_mass} as an unconstrained recursive reputation score. When a later domain profile enables it, the profile MUST use the following damped process.

Let \(b_i\in[0,1]\) be a non-recursive baseline derived only from verified first-order evidence. Let \(P\) be a row-stochastic matrix built from capped, verified, domain-scoped edge weights. For damping \(0\leq\lambda\leq0.85\):

\begin{align}
T^{(0)} &= b,\\
T^{(k+1)} &= (1-\lambda)b+\lambda P T^{(k)}.
\end{align}

Because \(\lambda<1\), the update is a contraction under the declared norm and has a unique fixed point. The implementation stops when \(\|T^{(k+1)}-T^{(k)}\|_\infty\leq 1\) basis point or after 100 iterations. Failure to converge within the declared bound returns \texttt{TSL\_NEIGHBOR\_MASS\_NONCONVERGENT} and the feature is omitted; it MUST NOT fall back to a provider-selected value.

Seed influence is governed by a signed \texttt{tsl.seed\_set\_manifest.v1} containing the domain, inclusion criteria, source evidence, approving organizations, expiry, conflicts of interest, removal and appeal process, and per-source concentration caps. A scoring provider MUST NOT privately choose its own authoritative seeds. The seed manifest requires independent approval and versioning, and no single issuer or operator may contribute more than the profile's declared concentration cap.

Every release of a profile using neighbor mass MUST publish sensitivity analysis that, at minimum: removes each seed class in turn; removes each approving organization in turn; perturbs eligible edge weights by the declared tolerance; varies \(\lambda\) across at least \(0.50,0.65,0.75,0.85\); and reports maximum subject-level change, label flips, and rank instability. If a subject's label changes under an allowed perturbation, the provider MUST widen uncertainty, suppress the feature, or abstain according to policy.

The initial \texttt{opensource\_maintainer\_continuity} profile sets the neighbor-mass weight to zero until these governance artifacts and sensitivity gates are implemented.

\subsection{Normalization Profiles}

For bounded ratios:

\begin{equation}
N_k(z)=\operatorname{clip}_{0,1}(z).
\end{equation}

For counts:

\begin{equation}
N_k(z)=\operatorname{clip}_{0,1}\left(\frac{\log(1+z)-\log(1+p_{1,k})}{\log(1+p_{99,k})-\log(1+p_{1,k})+\varepsilon}\right).
\end{equation}

For heavy-tailed positive values:

\begin{equation}
N_k(z)=\operatorname{clip}_{0,1}\left(\frac{\operatorname{asinh}(z/s_k)}{\operatorname{asinh}(p_{99,k}/s_k)}\right).
\end{equation}

For risk penalties where higher means worse:

\begin{equation}
Safe_k(z)=1-N_k(z).
\end{equation}

The normalization profile MUST include the training window, percentiles, missing-value policy, and whether parameters were fitted on a time-split training set.

\subsection{Reference Weight Profile}

The first implementation profile is specific to open-source release continuity. Cryptographic validity and trusted-time binding are gates and receive no weight.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.30\textwidth} p{0.15\textwidth} X}
\toprule
Component & Weight & Rule \\
\midrule
Protocol validity and trusted time & Gate & Required before any ordinary assessment. \\
Maintainer key lineage & 1800 bps & Rewards verified rotation and recovery continuity; old age alone cannot dominate. \\
Signed release history & 2000 bps & Uses only releases available before the target action. \\
Reviewer/co-maintainer evidence & 1200 bps & Requires verified or selectively disclosed evidence; no public graph inference from opaque receipts. \\
Repository and registry control continuity & 1200 bps & Versioned adapters and time-split evidence only. \\
Counterparty/community diversity & 700 bps & Caps closed-cluster inflation. \\
Maintainer attestation quality & 700 bps & Issuer quality, expiry, reversal, and appeal bounded. \\
Release cadence consistency & 700 bps & Low or missing activity reduces coverage, not moral standing. \\
Change-set and dependency continuity & 1000 bps & Drift produces step-up unless paired with hard adverse evidence. \\
Local verifier policy & 700 bps & Remains local unless explicitly disclosed. \\
Governed neighbor mass & 0 bps in v0 & May be enabled only under the convergence and seed-governance rules. \\
\bottomrule
\end{tabularx}
\end{center}

The internal evidence value is computed with deterministic fixed-point arithmetic. A declared calibration function maps the value and penalties to an action-specific continuity estimate. Providers MUST NOT describe the result as universal trust.

\subsection{Evidence Coverage and Abstention}

Evidence coverage measures whether the provider has enough verified evidence to make a confident claim.

\begin{equation}
q_i=G_i\cdot \min\left(1,\frac{n_{signed\_releases}}{10}\right)^{0.45}\cdot
\min\left(1,\frac{history\_days}{180}\right)^{0.35}\cdot
\min\left(1,\frac{n_{independent\_control\_or\_review\_sources}}{3}\right)^{0.20}.
\end{equation}

Only evidence that predates the target release may contribute. Repository forks, mirrors, or duplicate registry observations MUST be deduplicated by the declared profile.

A provider MUST abstain or use caution labels when coverage is low:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} p{0.18\textwidth} X}
\toprule
Coverage & Label Policy & Meaning \\
\midrule
\(q_i<0.25\) & Insufficient evidence & Do not infer suspiciousness from newness. \\
\(0.25\leq q_i<0.50\) & Unknown or caution & An assessment MAY be shown only with a wide interval and step-up guidance. \\
\(0.50\leq q_i<0.75\) & Medium confidence & Ordinary labels allowed except highest trust. \\
\(q_i\geq0.75\) & High confidence & Full label range allowed if calibration supports it. \\
\bottomrule
\end{tabularx}
\end{center}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.evidence_coverage.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "computed_at": "2026-05-26T00:00:00Z",
  "valid_signed_event_count": 184,
  "valid_receipt_count": 62,
  "unique_counterparty_count": 27,
  "distinct_community_count": 6,
  "attestation_count": 4,
  "recent_revocation_count": 0,
  "coverage_bps": 8600,
  "coverage_label": "high",
  "missing_evidence": []
}
\end{lstlisting}

\subsection{Calibration and Confidence Intervals}

Providers MUST report calibration on held-out time-split data. Expected calibration error is:

\begin{equation}
ECE=\sum_{b=1}^{B}\frac{|B_b|}{n}\left|acc(B_b)-conf(B_b)\right|.
\end{equation}

An ordinary continuity assessment SHOULD include a confidence interval. For transparent models, bootstrap over edges, counterparties, and attestations:

\begin{equation}
CI_{95}(S_i)=\left[Q_{0.025}(S_i^*),Q_{0.975}(S_i^*)\right].
\end{equation}

For sparse identities, the interval MUST widen by a coverage penalty:

\begin{equation}
width_{adj}=width_{boot}+\lambda_q(1-q_i).
\end{equation}

\subsection{Thresholds and False-Positive / False-Negative Tradeoff}

A label threshold MUST be derived from a domain cost model:

\begin{equation}
L(\theta)=c_{FP}FPR(\theta)+c_{FN}FNR(\theta)+c_AA(Abstain(\theta))+c_{Appeal}AppealRate(\theta).
\end{equation}

The reference labels are:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.18\textwidth} p{0.30\textwidth} X}
\toprule
Label & Required Rule & Notes \\
\midrule
Strong continuity & \(S\geq9000\), lower CI \(\geq8000\), \(q\geq0.75\) & Never shown for sparse identities. \\
Likely continuous & \(7500\leq S<9000\), \(q\geq0.50\) & Good continuity, not a guarantee. \\
Mixed continuity & \(5500\leq S<7500\) & Mixed or moderate evidence. \\
Unknown caution & \(3500\leq S<5500\) or low coverage & Default for legitimate new users. \\
Suspicious & \(1500\leq S<3500\) and adverse evidence present & Requires adverse signal beyond newness. \\
High risk & \(S<1500\) or hard negative proof & Reserved for revoked, compromised, scam-like, or severe abuse evidence. \\
Cryptographic failure & Any failed hard gate & No continuity value is emitted. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Signed Continuity Assessment Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.continuity_assessment.v2",
  "assessment_id": "0x...",
  "target_event_commitment": "0xrelease...",
  "subject": "did:tsl:maintainer:alice",
  "issuer": "did:tsl:provider:continuity-labs",
  "domain": "opensource_maintainer_continuity",
  "policy_id": "opensource_release_continuity.v1",
  "scoring_profile_id": "did:tsl:provider:continuity-labs/profile/opensource-continuity-v0.1.0",
  "model_version": "0.1.0",
  "gate_result": {
    "schema_valid": true,
    "canonicalization_valid": true,
    "signature_valid": true,
    "key_active": true,
    "not_revoked": true,
    "trusted_time_binding_valid": true,
    "trusted_time_binding_valid": true,
    "included_in_log": true,
    "checkpoint_valid": true,
    "settlement_satisfied": true
  },
  "continuity_bps": 8420,
  "confidence_interval_bps": [7660, 9010],
  "coverage_bps": 8600,
  "label": "likely_continuous",
  "recommended_action": "allow_with_monitoring",
  "reason_codes": [
    "valid_release_signature",
    "trusted_pre_revocation_time_evidence",
    "verified_key_lineage",
    "release_history_consistent"
  ],
  "risk_codes": [],
  "feature_vector_commitment": "0x...",
  "evidence_coverage_commitment": "0x...",
  "privacy_disclosure_level": "aggregate_only",
  "appeal_uri": "https://provider.example/appeals/0x...",
  "issued_at": "2026-05-26T00:00:00Z",
  "expires_at": "2026-05-27T00:00:00Z",
  "signature": "provider_signature"
}
\end{lstlisting}

\subsection{Assessment Algorithm}

\begin{lstlisting}[style=tslcode]
function assessContinuity(targetEvent, evidence, profile, domainPolicy): ContinuityAssessmentV2 {
  gate = verifyHardGates(targetEvent, evidence, domainPolicy)
  if gate.hasProtocolFailure():
    return signedFailureAssessment(targetEvent, gate)

  features = extractRegisteredDomainFeatures(targetEvent, evidence, profile.featureRegistry)
  coverage = computeEvidenceCoverage(features, evidence, targetEvent.issued_at)

  if coverage < domainPolicy.minimumCoverage and !features.hasAdverseEvidence:
    return signedAbstention(targetEvent, gate, coverage, "insufficient_evidence")

  normalized = normalize(features, profile.normalizationProfile)
  rawEvidence = weightedEvidence(normalized, profile.weightProfile, coverage)
  continuity = calibrate(rawEvidence, profile.calibrationProfile)
  interval = confidenceInterval(targetEvent, evidence, profile)
  label = thresholdForPolicy(continuity, interval, coverage, features, domainPolicy)

  return signContinuityAssessment({targetEvent, gate, continuity, interval, coverage, label})
}
\end{lstlisting}

% ============================================================
\section{Metadata Fingerprint Model: Privacy-Preserving Implementation}
% ============================================================

Metadata fingerprints are local, scope-limited summaries of continuity-relevant metadata. They are not public tracking identifiers. They MUST NOT become a cross-platform surveillance layer.

\subsection{Implementation Variants}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.20\textwidth} p{0.25\textwidth} X}
\toprule
Variant & Storage & Disclosure \\
\midrule
Local-only & Encrypted client store & Used only for local drift and relationship scoring. \\
Pairwise verifier & Derived per verifier domain & Stable only between subject and verifier; not reusable globally. \\
Provider aggregate & Provider receives buckets or proofs & Provider computes features without raw content or exact graph by default. \\
Public commitment & Salted commitment only & Proves committed existence and, once logged, trusted ordering without opening metadata. \\
High-assurance private proof & Commitments plus ZK predicates & Proves threshold facts without disclosing raw metadata. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Allowed, Restricted, and Forbidden Metadata}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} p{0.16\textwidth} X}
\toprule
Input & Default Rule & Notes \\
\midrule
Event class & Allowed & Message, receipt, transaction, agent call, code release. \\
Coarse time bucket & Allowed & Exact local time MAY remain private; checkpoint cadence and leaf ordering leak bounded timing information. \\
Content length bucket & Restricted & Use coarse buckets only; exact size can leak content. \\
Counterparty commitment & Allowed with salt & Exact counterparty stays local unless disclosed. \\
Key lineage & Allowed & Key age and rotation history are protocol facts. \\
Response latency bucket & Restricted & Useful for continuity; risky if exact. \\
Platform or transport & Local by default & Public platform tags can enable correlation. \\
Language or style embedding & Opt-in only & Content-derived; should be local or explicitly disclosed. \\
IP address, precise location, device fingerprint & Forbidden by default & High privacy risk and weak continuity value. \\
Protected attributes & Forbidden & Race, religion, health, sexuality, political affiliation unless legally required and explicitly scoped. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Scope-Key Derivation and Rotation}

A fingerprint key MUST be scoped. The same metadata tuple MUST NOT produce a reusable global identifier across verifiers.

\begin{equation}
k_{scope}=KDF(k_{master},\texttt{``tsl-fp-v1''}\parallel context\parallel verifier\_domain\parallel epoch\parallel purpose).
\end{equation}

Reference purposes are:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.23\textwidth} X}
\toprule
Purpose & Rule \\
\midrule
Local only & Never disclosed; rotated every 90 days unless user pins a baseline. \\
Pairwise verifier & Unique per verifier domain; rotated every 180 days or on user request. \\
Provider ephemeral & Unique per scoring request or short epoch; prevents provider-side long-term linking. \\
Public commitment & No key disclosure; fresh salt per commitment. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Bucketization}

Metadata MUST be minimized before fingerprinting. A reference tuple is:

\begin{equation}
\begin{aligned}
\mu_t=(&event\_class, time\_bucket, length\_bucket,\\
&key\_lineage\_bucket, counterparty\_class, receipt\_class).
\end{aligned}
\end{equation}

Reference buckets:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.25\textwidth} X}
\toprule
Field & Reference Buckets \\
\midrule
Time & 5 minute, 1 hour, 1 day, or local-only exact time depending on policy. \\
Content length & 0--256 bytes, 257--1024, 1025--4096, 4097--16384, above 16384. \\
Response latency & below 1 minute, 1--10 minutes, 10--60 minutes, 1--24 hours, above 24 hours. \\
Counterparty class & local-known, public-org, verified-agent, unknown, private-undisclosed. \\
Key lineage & same-key, rotated-with-recovery, new-key-unverified, revoked. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Fingerprint and Commitment Construction}

\begin{align}
F_t &= HMAC_{k_{scope}}(\texttt{tsl.metadata.fp.v1}\parallel canon(\mu_t)),\\
C_{F,t} &= \hash(\texttt{tsl.metadata.commit.v1}\parallel F_t\parallel s_t),\\
R_F &= \MerkleRoot(C_{F,1},\ldots,C_{F,n}).
\end{align}

The salt \(s_t\) MUST be a fresh 256-bit random value. A public fingerprint commitment MUST NOT include \(F_t\) itself. A private receipt-set root is a subject-controlled accumulator used only for selective or zero-knowledge proofs; it is not a second public transparency log.

\subsection{Fingerprint Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.metadata_fingerprint_commitment.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "scope_class": "pairwise_verifier",
  "scope_commitment": "0xhash_of_verifier_domain_and_epoch",
  "bucket_profile": "tsl.bucket_profile.default.v1",
  "fingerprint_commitment": "0x...",
  "salt_commitment": "0x...",
  "created_at_bucket": "2026-05-26T00:00:00Z/PT1H",
  "expires_at": "2026-08-26T00:00:00Z",
  "disclosure_policy": "selective_or_zk",
  "signature": "subject_signature"
}
\end{lstlisting}

\subsection{Stability and Spoofing}

Metadata features are classified by spoofing cost:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} p{0.18\textwidth} X}
\toprule
Class & Default Weight & Examples \\
\midrule
Cryptographic stable & High & Key lineage, revocation status, signed event chain. \\
Receipt-backed stable & High & Co-signed receipts, completed transactions. \\
Attestation-backed & Medium & Organization membership, issuer claims. \\
Cadence-derived & Low to medium & Timing, response latency, burstiness. \\
Self-reported & Low & User-declared platform, role, or metadata tags. \\
Content-derived opt-in & Domain-specific & Style or language embeddings; never default global feature. \\
\bottomrule
\end{tabularx}
\end{center}

An adversary can shape cadence and length buckets. Therefore metadata-only evidence MUST NOT be enough for a high-trust label.

\subsection{Correlation Risk Budget}

A provider or client SHOULD estimate public correlation risk:

\begin{equation}
LeakageRisk=\alpha T_{precision}+\beta V_{volume}+\gamma C_{counterparty}+\delta P_{platform}+\eta U_{uniqueness}.
\end{equation}

Reference policy:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} X}
\toprule
Risk & Required Mitigation \\
\midrule
Low & Ordinary salted commitments allowed. \\
Medium & Batch commitments, coarsen time, suppress platform tags. \\
High & Local-only or ZK threshold proof. \\
Severe & Do not publish; require pairwise verifier proof only. \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Graph Geometry: Construction Rules, Profiles, and Manifolds}
% ============================================================

At time \(t\), the trust graph is a typed, temporal, weighted multigraph:

\begin{equation}
G_t=(V_t,E_t,\mathcal{C},\omega,\tau,\Pi),
\end{equation}

where \(\Pi\) is the graph profile that defines edge types, weights, decay, community detection, seed rules, and privacy constraints.

\subsection{Graph Implementation Variants}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.20\textwidth} p{0.25\textwidth} X}
\toprule
Variant & Graph Data & Use \\
\midrule
Local verifier graph & User device or enterprise gateway & Personal relationship and private allowlist scoring. \\
Provider aggregate graph & Provider-visible commitments and disclosed proofs & General risk intelligence without raw private content. \\
Federated graph features & Multiple providers compute aggregates & Reduces centralized graph ownership. \\
Private graph proof & Commitments plus ZK or secure aggregation & High-assurance privacy for thresholds and distances. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Graph Profile Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.graph_profile.v2",
  "profile_id": "graph-default-2026-05",
  "edge_weight_profile": "default_edge_weights_v2",
  "temporal_decay_profile": "default_decay_v2",
  "community_detection": {
    "algorithm": "leiden",
    "resolution_bps": 10000,
    "min_cluster_size": 20,
    "edge_weight_floor_bps": 500
  },
  "seed_sets": {
    "trusted_seed_policy": "audited_multi_provider_seed_v1",
    "adversarial_seed_policy": "evidence_bound_abuse_seed_v1"
  },
  "negative_edge_policy": {
    "requires_evidence_commitment": true,
    "requires_appeal_uri": true,
    "max_single_negative_weight_bps": 1500,
    "decay_days": 30
  },
  "privacy_policy": {
    "raw_counterparty_upload_required": false,
    "allows_pairwise_private_features": true
  }
}
\end{lstlisting}

\subsection{Allowed Graph Edges}

Edges MUST come from verifiable protocol objects or explicit local context. Scraped social links, follows, likes, profile similarity, and unverified contact lists MUST NOT be used as protocol graph edges.

\begin{longtable}{>{\bfseries}p{0.24\textwidth} p{0.14\textwidth} p{0.14\textwidth} p{0.36\textwidth}}
\toprule
Edge Type & Base Weight & Half-Life & Validation Rule \\
\midrule
Unilateral signed event & 0.10 & 90 days & Valid signature, active key, non-replayed nonce. \\
Received receipt & 0.30 & 180 days & Receiver co-signature over event commitment. \\
Reply receipt & 0.50 & 180 days & Reciprocal receipt or linked reply commitment. \\
Completed transaction & 1.00 & 365 days & Completion proof and no unresolved dispute. \\
Disputed transaction & -0.50 & 30 days & Evidence commitment and appeal path required. \\
Positive attestation & \(Q_j\kappa\) & Claim-specific & Valid issuer, non-expired claim, issuer quality. \\
Negative attestation & \(-Q_j\kappa\) & 7--90 days & Evidence, appeal, severity limit, reversal tracking. \\
Delegation edge & Scope-specific & Until expiry & Principal signature and active delegation. \\
Organization membership & 0.70 & Until expiry & Issuer status active; membership proof valid. \\
Code release signature & 0.60 & 365 days & Maintainer or release-bot key active. \\
\bottomrule
\end{longtable}

The effective edge weight is:

\begin{equation}
\omega_e(t)=\omega_{base}(c_e)\cdot q_{source(e)}\cdot d_{c_e}(t-\tau_e)\cdot \rho_e\cdot \chi_e,
\end{equation}

where \(q_{source}\) is a capped, non-recursive source-quality value derived from verified first-order evidence or a separately governed fixed-point profile; \(d_c\) is decay, \(\rho_e\) is receipt status, and \(\chi_e\) is an appeal/reversal multiplier.

\subsection{Temporal Decay}

Use exponential half-life decay:

\begin{equation}
d_c(\Delta)=2^{-\Delta/h_c}.
\end{equation}

Immediate state facts override decay. Revocation is not a decayed feature; it is a state transition.

\subsection{Reciprocity, Diversity, and Concentration}

Directional mass:

\begin{equation}
w_{ij}(t)=\sum_{e:i\rightarrow j}\omega_e(t).
\end{equation}

Pair reciprocity:

\begin{equation}
r_{ij}=\frac{2\min(w_{ij},w_{ji})}{w_{ij}+w_{ji}+\varepsilon}.
\end{equation}

Counterparty mass distribution:

\begin{equation}
p_{ij}=\frac{w_{ij}+w_{ji}}{\sum_k(w_{ik}+w_{ki})+\varepsilon}.
\end{equation}

Diversity metrics:

\begin{align}
HHI_i &= \sum_jp_{ij}^2,\\
D_i &= 1-HHI_i,\\
H_i &= -\sum_jp_{ij}\log(p_{ij}+\varepsilon),\\
N^{eff}_i &= e^{H_i}.
\end{align}

A high volume of edges with low \(N^{eff}\) is weak evidence.

\subsection{Community and Escape Metrics}

For community assignment \(comm(v)\):

\begin{align}
InternalMass_i &= \sum_{j:comm(j)=comm(i)}(w_{ij}+w_{ji}),\\
ExternalMass_i &= \sum_{j:comm(j)\neq comm(i)}(w_{ij}+w_{ji}),\\
Escape_i &= \frac{ExternalMass_i}{InternalMass_i+ExternalMass_i+\varepsilon}.
\end{align}

For a cluster \(C\):

\begin{align}
Density(C)&=\frac{\sum_{i,j\in C}w_{ij}}{|C|(|C|-1)+\varepsilon},\\
Conductance(C)&=\frac{cut(C,\bar C)}{\min(vol(C),vol(\bar C))+\varepsilon},\\
SeedEscape(C)&=\frac{\sum_{i\in C,j\in S_T}w_{ij}}{\sum_{i\in C,j}w_{ij}+\varepsilon}.
\end{align}

Low conductance, high internal density, low seed escape, and synchronized creation are Sybil evidence when observed together.

\subsection{Trusted and Adversarial Manifolds}

The organic manifold \(\mathcal{M}_C\) is a distribution over trajectories with:

\begin{itemize}
    \item long-lived key lineage or verified recovery,
    \item diverse reciprocal receipts,
    \item cross-community escape,
    \item low unresolved dispute rate,
    \item stable cadence with explainable changes,
    \item attestations from issuers with low reversal rates.
\end{itemize}

The adversarial manifold \(\mathcal{M}_A\) is a distribution over trajectories with:

\begin{itemize}
    \item synchronized identity creation,
    \item dense internal receipts and low external escape,
    \item shared issuer or device patterns where disclosure permits,
    \item abrupt target-community shifts,
    \item high outbound burstiness,
    \item proximity to evidence-bound abuse clusters.
\end{itemize}

Distance features MAY include:

\begin{align}
D_T(i)&=(x_i-\mu_T)^\top\Sigma_T^{-1}(x_i-\mu_T),\\
D_A(i)&=\min_{a\in\mathcal{A}}\operatorname{dist}(x_i,x_a),\\
D_{diff}(i,S)&=1-PPR_S(i),\\
D_{cluster}(i)&=\min_{C\in\mathcal{C}_A}\operatorname{dist}(x_i,\mu_C).
\end{align}

These are statistical features, not proof of fraud.

\begin{principlebox}{Fixed-Point Graph Outputs}
Graph math MAY be estimated with real-valued methods during research. Any graph feature written into a signed or hashed \TSL{} object MUST be converted to integer fields such as \texttt{reciprocity\_bps}, \texttt{counterparty\_hhi\_bps}, or \texttt{effective\_counterparty\_count\_milli}. Floating-point values MUST NOT appear in signed graph-profile, graph-feature, Sybil, drift, model-card, or evaluation-report objects.
\end{principlebox}

\subsection{Graph Feature Output}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.graph_feature_vector.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "graph_profile_id": "graph-default-2026-05",
  "computed_at": "2026-05-26T00:00:00Z",
  "reciprocity_bps": 8120,
  "counterparty_diversity_bps": 7740,
  "effective_counterparty_count_milli": 18600,
  "community_escape_bps": 6320,
  "trusted_neighbor_mass_bps": 7010,
  "cluster_concentration_bps": 1280,
  "adversarial_proximity_bps": 420,
  "privacy_level": "aggregate_no_exact_counterparties",
  "feature_commitment": "0x..."
}
\end{lstlisting}

% ============================================================
\section{Sybil Detection and New Identity Handling}
% ============================================================

Sybil detection in \TSL{} is not a binary claim that an identity is fake. It is a cost-aware estimate that a set of identities is controlled, coordinated, or inflated in a way that should reduce trust or require step-up verification.

\subsection{Threat Budget Tiers}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.13\textwidth} p{0.28\textwidth} X}
\toprule
Tier & Capability & Examples \\
\midrule
B0 & Cheap fake identities & Scripted accounts, no durable receipts. \\
B1 & Internal receipt farm & Controlled identities co-sign each other. \\
B2 & Purchased aged identities & Old accounts or keys acquired from others. \\
B3 & Compromised real identities & Stolen keys, session hijack, device compromise. \\
B4 & Corrupt or weak issuer & False attestations from issuer-like accounts. \\
B5 & Relay, provider, or auditor collusion & Checkpoint manipulation, model abuse, selective visibility. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Sybil Resistance Assumptions}

The protocol assumes:

\begin{enumerate}
    \item uncompromised signatures cannot be forged,
    \item diverse reciprocal receipts from honest regions are costly to obtain,
    \item audited issuers face penalties for false attestations,
    \item append-only checkpoints prevent undetectable history rewriting,
    \item at least one honest auditor or verifier observes conflicting public checkpoint views,
    \item scoring providers are plural and challengeable.
\end{enumerate}

\subsection{Cluster Metrics}

For a candidate cluster \(C\):

\begin{align}
CreationSync(C)&=1-\frac{MAD(created\_at(C))}{T_{sync}+\varepsilon},\\
InternalRatio(C)&=\frac{\sum_{i,j\in C}w_{ij}}{\sum_{i\in C,j}w_{ij}+\varepsilon},\\
ExternalDiversity(C)&=1-\sum_{q}P_{Cq}^{2},\\
IssuerReuse(C)&=\max_m\frac{|\{i\in C:issuer(i)=m\}|}{|C|},\\
ReceiptSymmetry(C)&=\frac{\sum_{i,j\in C}\min(w_{ij},w_{ji})}{\sum_{i,j\in C}\max(w_{ij},w_{ji})+\varepsilon},\\
SeedEscape(C)&=\frac{\sum_{i\in C,j\in S_T}w_{ij}}{\sum_{i\in C,j}w_{ij}+\varepsilon}.
\end{align}

Reference Sybil cluster risk:

\begin{equation}
\begin{aligned}
Risk(C)=\sigma(&\alpha_0+\alpha_1InternalRatio+\alpha_2CreationSync+\alpha_3IssuerReuse\\
&+\alpha_4ReceiptSymmetry-\alpha_5SeedEscape-\alpha_6ExternalDiversity).
\end{aligned}
\end{equation}

\subsection{Cost-of-Attack Model}

An attacker seeking score \(S^*\) must buy or create evidence:

\begin{equation}
Cost(S^*)=C_{ids}+C_{time}+C_{external\_receipts}+C_{attestations}+C_{compromise}+C_{evasion}.
\end{equation}

The robust design objective is:

\begin{equation}
Cost(S^*) > ExpectedBenefit(S^*)
\end{equation}

for high-risk actions in target domains.

\subsection{Collusion Simulation Profile}

Every production scorer SHOULD test at least these synthetic attacks:

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.sybil_simulation_profile.v1",
  "attack_scenarios": [
    {"name": "dense_internal_farm", "identities": 1000, "internal_receipt_rate_bps": 8000},
    {"name": "slow_aged_farm", "identities": 500, "aging_days": 180, "low_rate_edges": true},
    {"name": "bridge_attack", "identities": 200, "honest_bridge_edges": 20},
    {"name": "issuer_collusion", "identities": 300, "weak_issuer_fraction_bps": 2500},
    {"name": "compromised_real_accounts", "identities": 50, "drift_after_day": 90}
  ],
  "success_metric": "fraction_reaching_likely_continuous_label",
  "required_detection_rate_bps": 8500
}
\end{lstlisting}

\subsection{Bootstrap Rules for New Identities}

New identities MUST be handled as low-evidence, not inherently malicious.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} p{0.24\textwidth} X}
\toprule
Stage & Requirements & Allowed Label Ceiling \\
\midrule
Fresh & Valid key, no receipts & Unknown caution. \\
Seeded & Verified organization, inviter, or local relationship & Medium trust unless receipts exist. \\
Emerging & At least 5 reciprocal receipts and 3 counterparties & Likely continuity MAY be supported in narrow local context. \\
Established & At least 25 events, 10 receipts, 5 counterparties & Full label range possible subject to calibration. \\
High-value actor & Strong attestations or long history & Full label range, stricter drift monitoring. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Sybil Assessment Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.sybil_assessment.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "cluster_id_commitment": "0x...",
  "computed_at": "2026-05-26T00:00:00Z",
  "adversary_tier_assumed": "B2",
  "cluster_size_bucket": "100-500",
  "cluster_concentration_bps": 2200,
  "trusted_escape_bps": 7100,
  "internal_receipt_ratio_bps": 2200,
  "creation_sync_bps": 900,
  "issuer_reuse_bps": 300,
  "external_diversity_bps": 6900,
  "attack_cost_minor_units": 2500000,
  "risk_score_bps": 1820,
  "risk_label": "low",
  "privacy_level": "cluster_commitment_only",
  "signature": "provider_signature"
}
\end{lstlisting}

% ============================================================
\section{Behavioral Drift and Compromise Detection}
% ============================================================

Behavioral drift is a change in trajectory. It is not automatically bad. The robust implementation treats drift as a step-up signal unless it is combined with hard evidence of compromise or adversarial activity.

\subsection{Drift Windows}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.20\textwidth} p{0.18\textwidth} X}
\toprule
Window & Reference Duration & Purpose \\
\midrule
Immediate & 1 hour & Burst, spam, unusual agent tool use. \\
Short & 24 hours & Compromise indicators and sudden target change. \\
Medium & 30 days & New community, new transaction pattern, new cadence. \\
Long & 180 days & Baseline continuity and seasonal behavior. \\
Dormant & 90 or more inactive days & Reactivation risk; requires special handling. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Drift Vector}

The drift vector is grouped so explanations are actionable:

\begin{equation}
\Delta_i=(\Delta_{key},\Delta_{graph},\Delta_{action},\Delta_{cadence},\Delta_{claim},\Delta_{agent},\Delta_{local}).
\end{equation}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} X}
\toprule
Component & Examples \\
\midrule
Key drift & New active key, recovery event, device-key churn, post-revocation behavior. \\
Graph drift & New counterparties, old counterparties absent, new community, seed distance change. \\
Action drift & New transaction type, new code release behavior, new outbound message class. \\
Cadence drift & Burstiness, dormant reactivation, unusual time bucket, response latency shift. \\
Claim drift & New negative attestation, expired org membership, conflicting attestations. \\
Agent drift & New tools, parameter ranges, subdelegation attempts, value escalation. \\
Local drift & Verifier-specific relationship break, local denylist, unusual direct context. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Baseline Model}

For feature vector \(x_i(t)\), compute a robust baseline from a long window:

\begin{align}
\mu_i^{base} &= median(x_i(t-W_L),\ldots,x_i(t-W_M)),\\
\Sigma_i^{base} &= robustCov(x_i),\\
D_i^{Maha} &= \sqrt{(x_i^{cur}-\mu_i^{base})^\top(\Sigma_i^{base}+\lambda I)^{-1}(x_i^{cur}-\mu_i^{base})}.
\end{align}

For sparse identities, use cohort baselines and widen uncertainty.

\subsection{Drift Score}

\begin{equation}
DriftRisk_i=\operatorname{clip}_{0,1}\left(\frac{D_i^{Maha}}{D_{crit}}\right)\cdot q_i + DormantPenalty_i + KeyPenalty_i.
\end{equation}

Reference thresholds:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.20\textwidth} p{0.16\textwidth} X}
\toprule
Risk & Threshold & Action \\
\midrule
Low & below 2500 basis points & No special action. \\
Moderate & 2500--5000 & Show explanation; reduce confidence. \\
High & 5000--7500 & Step-up verification for high-value actions. \\
Severe & above 7500 & Block or quarantine in high-risk domains until recovery or review. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Compromise vs. Legitimate Change}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.27\textwidth} p{0.34\textwidth} X}
\toprule
Signal & More Like Compromise & More Like Legitimate Change \\
\midrule
Key change & No recovery proof, followed by burst & Signed rotation with recovery policy. \\
Dormant reactivation & Immediate outbound requests or payments & Step-up proof and gradual return. \\
Graph shift & Old counterparties vanish, new targets appear & New org membership or disclosed role change. \\
Agent tool change & New high-risk tool or value escalation & New delegation signed by principal. \\
Attestations & Negative claims unresolved & Positive verified migration attestation. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Drift Report Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.drift_report.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "computed_at": "2026-05-26T00:00:00Z",
  "baseline_window_days": 180,
  "observation_window_days": 1,
  "drift_score_bps": 6120,
  "drift_label": "severe",
  "components": {
    "key_drift_bps": 7200,
    "graph_drift_bps": 5800,
    "action_drift_bps": 4300,
    "cadence_drift_bps": 7600,
    "claim_drift_bps": 0,
    "agent_drift_bps": 0
  },
  "reason_codes": ["dormant_reactivation", "new_key_without_prior_local_history", "outbound_burst"],
  "action": "step_up",
  "signature": "provider_signature"
}
\end{lstlisting}

% ============================================================
\section{Attestation Trust Model}
% ============================================================

An attestation proves that an issuer made a claim. It does not prove the claim is true. A robust \TSL{} implementation treats attestations as evidence with issuer quality, claim class, decay, conflict handling, and appeal mechanics.

\subsection{Issuer Quality}

Issuer quality is domain-specific:

\begin{equation}
\begin{aligned}
Q_j^d=\sigma(&\beta_0+\beta_1Audit_j+\beta_2Accuracy_j+\beta_3Age_j+\beta_4StakeOrBond_j\\
&-\beta_5Reversal_j-\beta_6Dispute_j-\beta_7Conflict_j).
\end{aligned}
\end{equation}

Where no token or bond exists, \(StakeOrBond\) is replaced by contractual accountability, public audit status, or enterprise trust tier. Token ownership alone MUST NOT increase issuer quality.

\subsection{Attestation Classes and Controls}

\begin{longtable}{>{\bfseries}p{0.24\textwidth} p{0.24\textwidth} p{0.38\textwidth}}
\toprule
Class & Evidence Requirement & Abuse Control \\
\midrule
Organization member & Membership record commitment & Expiration, issuer revocation, subject consent where needed. \\
Known business & Business registry or domain proof & Periodic renewal and issuer audit. \\
Verified maintainer & Repository or release-key proof & Code-release drift monitoring. \\
Trusted counterparty & Prior receipt or contract proof & Weight capped; no global trust inflation. \\
Private warning & Local evidence & Not public by default; expiration. \\
Provider risk flag & Evidence commitment and provider signature & Appeal URI, short expiry, audit sampling. \\
Public negative claim & Strong evidence commitment and high issuer quality & Appeal before high-impact propagation where feasible. \\
Compromise warning & Revocation or recovery evidence & Immediate visibility; short review loop. \\
Fraud label & Adjudicated evidence & Human review, reversal mechanics, defamation-aware policy. \\
\bottomrule
\end{longtable}

\subsection{Attestation Decay}

Positive attestations decay unless the claim type has explicit validity:

\begin{equation}
Value(a,t)=Q_{issuer(a)}\cdot \kappa_{class(a)}\cdot 2^{-(t-t_a)/h_a}\cdot StateMultiplier(a,t).
\end{equation}

Negative attestations decay faster unless renewed with evidence:

\begin{equation}
NegValue(a,t)=-Q_{issuer(a)}\cdot \kappa_{class(a)}\cdot 2^{-(t-t_a)/h_a}\cdot AppealMultiplier(a,t).
\end{equation}

If an attestation is reversed, its contribution becomes zero and the issuer reversal rate increases.

\subsection{Conflict Resolution}

For claim class \(c\):

\begin{align}
PosMass_c &= \sum_{a\in A^+_c}Value(a,t),\\
NegMass_c &= \sum_{a\in A^-_c}|NegValue(a,t)|,\\
Conflict_c &= \frac{\min(PosMass_c,NegMass_c)}{PosMass_c+NegMass_c+\varepsilon}.
\end{align}

High conflict does not automatically mean high risk. It means the verifier must show the conflict and possibly require review.

\subsection{Attestation Object V2}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.attestation.v2",
  "attestation_id": "0x...",
  "issuer": "did:tsl:org:issuer",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "claim_class": "org_member",
  "claim_polarity": "positive",
  "severity": "none",
  "claim_commitment": "0x...",
  "evidence_commitment": "0x...",
  "evidence_policy": "selective_disclosure_or_auditor_review",
  "visibility": "selective",
  "appeal_uri": "https://issuer.example/appeal/0x...",
  "issued_at": "2026-05-26T00:00:00Z",
  "valid_after": "2026-05-26T00:00:00Z",
  "expires_at": "2026-11-26T00:00:00Z",
  "revocation_pointer": "0x...",
  "signature": "issuer_signature"
}
\end{lstlisting}

\subsection{Appeal and Reversal Mechanics}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.attestation_appeal.v1",
  "appeal_id": "0x...",
  "attestation_id": "0x...",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "appeal_reason_class": "incorrect_claim",
  "counter_evidence_commitment": "0x...",
  "requested_action": "retract_or_downgrade",
  "submitted_at": "2026-05-26T00:00:00Z",
  "status": "submitted",
  "signature": "subject_signature"
}
\end{lstlisting}

A public negative claim MUST expose an appeal state: \texttt{submitted}, \texttt{under\_review}, \texttt{upheld}, \texttt{reversed}, \texttt{expired}, or \texttt{escalated}. In ordinary prose, these machine labels should be rendered without implying guilt before adjudication.

% ============================================================
\section{Privacy-Preserving Analytics and Zero-Knowledge Roadmap}
% ============================================================

The privacy roadmap MUST be staged. \TSL{} adoption should not depend on advanced private graph proofs in the MVP. The robust path is selective disclosure first, threshold proofs second, private graph analytics last.

\subsection{Privacy Implementation Variants}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.18\textwidth} p{0.27\textwidth} X}
\toprule
Stage & Primitive & Use \\
\midrule
P0 & Salted commitments & Commit content, metadata, counterparties without disclosure. \\
P1 & Merkle inclusion proofs & Prove event or receipt exists in a committed set. \\
P2 & Selective disclosure & Open one claim without opening the whole graph. \\
P3 & Threshold ZK & Prove age, count, rate, or value bounds. \\
P4 & Set membership and non-membership & Prove membership in org set or absence from revocation/abuse set. \\
P5 & Delegation-scope proof & Prove parameters satisfy policy without revealing all parameters. \\
P6 & Private graph analytics & Approximate distance or escape metrics using commitments or secure aggregation. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Circuit Registry}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.zk_circuit_registry_entry.v1",
  "circuit_id": "tsl.receipt_count_threshold.v1",
  "statement": "subject has at least N valid reciprocal receipts before time T",
  "proving_system": "plonkish_or_groth16_declared_by_backend",
  "public_inputs": ["subject_commitment", "threshold", "epoch_root", "circuit_version"],
  "private_witness": ["receipt_leaves", "counterparty_salts", "merkle_paths"],
  "output": "boolean plus proof bytes",
  "soundness_bits_min": 100,
  "privacy_notes": "Does not reveal counterparties or exact count beyond threshold.",
  "auditor_commitment": "0x..."
}
\end{lstlisting}

\subsection{Required Circuit Interfaces}

\begin{longtable}{>{\bfseries}p{0.22\textwidth} p{0.28\textwidth} p{0.38\textwidth}}
\toprule
Circuit & Public Claim & Private Witness \\
\midrule
Age threshold & Identity age exceeds \(T\) & Creation proof, salt, registry path. \\
Receipt count threshold & Reciprocal receipts exceed \(N\) & Receipt leaves, salts, counterparties, paths. \\
Dispute-rate bound & Dispute rate below \(r\) & Completed and disputed receipt leaves. \\
Set membership & Subject is in approved set & Membership leaf, salt, Merkle path. \\
Non-membership & Subject absent from revocation or abuse set & Sparse Merkle non-membership path. \\
Organization membership & Subject has active org claim & Attestation witness and issuer path. \\
Delegation scope & Action parameters are within scope & Parameter values, policy witness, delegation path. \\
Private graph distance & Distance or escape exceeds threshold & Committed local neighborhood, aggregate proof, seed commitments. \\
\bottomrule
\end{longtable}

\subsection{Production ZK Ceremony and Release Decision}

For production and \texttt{TSL-MAINNET}, the required circuit interfaces above MUST be released through a new protocol-specific ceremony. Existing local setup artifacts, development fixtures, prototype circuits, and any circuit identifier marked \texttt{dev}, \texttt{fixture}, \texttt{prototype}, or equivalent MUST NOT satisfy production policy.

Each production circuit release MUST include:

\begin{itemize}
    \item circuit source hash;
    \item R1CS hash;
    \item WASM hash;
    \item zkey hash;
    \item verification-key hash;
    \item declared hash suite;
    \item public-signal schema;
    \item private-witness schema;
    \item soundness bits, with minimum \(100\);
    \item privacy notes describing the disclosed statement and hidden witness;
    \item ceremony transcript hash;
    \item manifest signature;
    \item reviewer or auditor signature.
\end{itemize}

The selected production hash suite for circuit-internal commitments is \texttt{poseidon-bn254-v1}. Off-circuit object commitments and release-manifest commitments remain canonical SHA-256 domain-separated commitments unless a later conformance level explicitly upgrades them.

The production release set is:

\begin{enumerate}
    \item \texttt{identity\_age\_days}
    \item \texttt{reciprocal\_receipt\_count}
    \item \texttt{dispute\_rate\_bound}
    \item \texttt{set\_membership}
    \item \texttt{revocation\_set\_non\_membership}
    \item \texttt{organization\_membership}
    \item \texttt{agent\_scope\_compliance}
    \item \texttt{private\_graph\_distance}
\end{enumerate}

The production verification-key registry MUST reject:

\begin{itemize}
    \item any unregistered circuit;
    \item any inactive or revoked manifest;
    \item any proof whose verification key does not hash to the registered manifest key;
    \item any manifest without a signature;
    \item any manifest without public and private witness schemas;
    \item any manifest below the configured soundness threshold;
    \item any development or fixture circuit under production policy.
\end{itemize}

Mainnet readiness for ZK proofs is blocked until a real ceremony transcript, verification-key registry, external circuit review, and protocol security approval exist. Generated text, local fixtures, or repository-only placeholders MUST NOT count as ceremony or audit evidence.

\subsection{Example Threshold Proof Request}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.zk_proof_request.v1",
  "circuit_id": "tsl.receipt_count_threshold.v1",
  "subject": "did:tsl:eip155-8453:0xabc...",
  "public_statement": {
    "minimum_reciprocal_receipts": 50,
    "valid_before": "2026-05-26T00:00:00Z",
    "public_log_id": "tsl-log:00af",
    "public_tree_size": 184294,
    "public_root_hash": "0x...",
    "private_receipt_set_root": "0x..."
  },
  "disclosure_policy": "do_not_reveal_counterparties",
  "verifier_domain": "marketplace.example"
}
\end{lstlisting}

\subsection{Metadata Privacy Leakage Analysis}

A privacy report MUST consider:

\begin{itemize}
    \item timing leakage from checkpoint cadence and cumulative leaf ordering,
    \item volume leakage from repeated commitments,
    \item uniqueness leakage from unusual bucket combinations,
    \item counterparty correlation through repeated pairwise proofs,
    \item public commitment reuse across domains,
    \item provider-side linkage through scoring requests,
    \item appeal and negative-claim disclosure risks.
\end{itemize}

Reference leakage score:

\begin{equation}
PLS=1-\prod_k(1-l_k),
\end{equation}

where \(l_k\) are normalized leakage components. High-assurance profiles MUST publish mitigation for any \(PLS>0.35\).

% ============================================================
\section{Model Governance and Provider Accountability}
% ============================================================

Scoring providers are not protocol truth authorities. They are accountable issuers of probabilistic assessments.

\subsection{Provider Lifecycle}

\begin{equation}
registered \rightarrow shadow \rightarrow active \rightarrow probation \rightarrow suspended \rightarrow revoked.
\end{equation}

Models follow:

\begin{equation}
draft \rightarrow offline\_evaluated \rightarrow shadow \rightarrow canary \rightarrow active \rightarrow deprecated \rightarrow retired.
\end{equation}

A provider on probation MAY issue assessments only if verifier policy accepts probationary providers.

\subsection{Provider Registration Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.provider_registration.v1",
  "provider_id": "did:tsl:provider:continuity-labs",
  "legal_or_pseudonymous_name_commitment": "0x...",
  "public_keys": [{"key_id": "#assessment-key-1", "type": "ed25519", "public_key": "0x..."}],
  "supported_domains": ["opensource_maintainer_continuity"],
  "provider_status": "active",
  "audit_policy_uri": "https://provider.example/audit-policy",
  "appeal_policy_uri": "https://provider.example/appeals",
  "privacy_policy_commitment": "0x...",
  "emergency_contact_commitment": "0x...",
  "registered_at": "2026-05-26T00:00:00Z",
  "signature": "provider_controller_signature"
}
\end{lstlisting}

\subsection{Model Card Schema}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.model_card.v2",
  "model_id": "opensource-continuity-v0.1.0",
  "provider": "did:tsl:provider:continuity-labs",
  "domain": "opensource_maintainer_continuity",
  "intended_use": "open-source release continuity and compromise step-up",
  "not_intended_for": ["employment_decisions", "credit_decisions", "law_enforcement", "general_person_reputation"],
  "feature_registry_commitment": "0x...",
  "training_data_statement": {
    "time_window": "2025-01-01/2026-04-30",
    "label_sources": ["partner_reports", "appeal_adjudication", "red_team"],
    "private_data_used": false,
    "protected_attribute_use": "not_used"
  },
  "metrics": {
    "auroc_bps": 9430,
    "auprc_bps": 7110,
    "ece_bps": 310,
    "sparse_identity_false_positive_rate_bps": 180,
    "p95_latency_ms": 92,
    "appeal_reversal_rate_bps": 120
  },
  "known_limitations": ["low coverage for very new identities", "not proof of intent"],
  "red_team_report_commitment": "0x...",
  "privacy_report_commitment": "0x...",
  "signed_changelog_commitment": "0x...",
  "signature": "provider_signature"
}
\end{lstlisting}

\subsection{Challenge and Appeal Process}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.model_challenge.v1",
  "challenge_id": "0x...",
  "challenger": "did:tsl:eip155-8453:0xabc...",
  "provider": "did:tsl:provider:continuity-labs",
  "assessment_id": "0x...",
  "challenge_class": "incorrect_label",
  "evidence_commitment": "0x...",
  "requested_remedy": "reissue_assessment_or_explain",
  "submitted_at": "2026-05-26T00:00:00Z",
  "status": "submitted",
  "signature": "challenger_signature"
}
\end{lstlisting}

\subsection{Provider Accountability Metrics}

\begin{align}
ProviderQuality &= \sigma(\theta_0+\theta_1Calibration+\theta_2RedTeam+\theta_3AuditPass\\
&\quad-\theta_4Reversal-\theta_5UnresolvedAppeal-\theta_6PrivacyIncident),\\
ReversalRate &= \frac{reversed\_assessments}{challenged\_assessments+\varepsilon},\\
TimelyAppealRate &= \frac{appeals\_closed\_within\_SLA}{appeals\_submitted+\varepsilon}.
\end{align}

Sanctions MAY include downgrade to probation, model retirement, assessment-key revocation, public audit finding, bond slashing if a bond module exists, or removal from default verifier policy.

\subsection{Release Controls}

A model update MUST NOT become active unless:

\begin{equation}
EvalPass \land CalibrationPass \land PrivacyPass \land RedTeamPass \land RollbackPlanExists.
\end{equation}

Production models SHOULD be deployed through shadow and canary phases. Canary exposure SHOULD be below 10\% before promotion unless emergency mitigation is declared.

% ============================================================
\section{Evaluation Framework}
% ============================================================

\begin{principlebox}{First-Paper Evaluation Scope}
The first paper evaluates only \texttt{opensource\_maintainer\_continuity}. Train/test splits MUST prevent leakage across time, repositories, packages, maintainers, forks, and mirrored release artifacts. Results for other domains are not reported as validated protocol performance.
\end{principlebox}

The evaluation framework must test accuracy, calibration, fairness to sparse identities, latency, privacy leakage, robustness under attacks, and longitudinal drift.

\subsection{Benchmark Dataset Families}

\begin{longtable}{>{\bfseries}p{0.23\textwidth} p{0.28\textwidth} p{0.37\textwidth}}
\toprule
Dataset & Source & Purpose \\
\midrule
Historical benign continuity & Verified logs and partner opt-in data & Estimate ordinary trajectory distribution. \\
Confirmed abuse & Evidence-bound phishing, fraud, scam, compromised identity cases & Positive adversarial labels. \\
Appeal adjudication & Reversed and upheld assessments & Measure label quality and provider abuse. \\
Sparse legitimate identities & New users, privacy-preserving users, low-volume users & Prevent new-user punishment. \\
Synthetic Sybil farms & Simulated collusion graphs & Stress-test cluster metrics. \\
Compromise simulations & Key theft and dormant reactivation scripts & Test drift detection. \\
Agent misuse traces & Tool calls, delegation violations, value escalation & Test agent authorization. \\
Negative controls & Similar-looking but benign communities & Measure false positives. \\
\bottomrule
\end{longtable}

\subsection{Ground Truth Labeling}

Labels MUST be time-indexed:

\begin{equation}
y_i(t)\in\{benign,abusive,compromised,sybil,unknown,disputed\}.
\end{equation}

A label is valid only for a time window and evidence class. Human adjudication SHOULD use at least two independent reviewers for high-impact negative labels, with a tie-breaker for disagreement.

\subsection{Metrics}

\begin{align}
AUROC&=\Pr(S^+>S^-),\\
Precision&=\frac{TP}{TP+FP},\\
Recall&=\frac{TP}{TP+FN},\\
FPR_{sparse}&=\frac{FP_{sparse}}{FP_{sparse}+TN_{sparse}},\\
ECE&=\sum_b\frac{|B_b|}{n}|acc(B_b)-conf(B_b)|,\\
Coverage&=\frac{assessments\_not\_abstained}{total\_eligible},\\
Leakage&=PLS,\\
Latency_{p95}&=Q_{0.95}(verification\_time).
\end{align}

\subsection{Promotion Gates for the Initial Domain}

Promotion gates are fixed before final test evaluation and expressed in basis points. The reference values below are engineering targets, not evidence of achieved performance.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.27\textwidth} p{0.17\textwidth} p{0.17\textwidth} X}
\toprule
Domain & Min AUROC bps & Max ECE bps & Additional Gate \\
\midrule
Open-source maintainer continuity & 8600 & 500 & Maintainer-transition false-positive review below 200 bps; zero acceptance of the reference post-revocation backdating attack; calibrated step-up rate reported by project size and history coverage. \\
\bottomrule
\end{tabularx}
\end{center}

No threshold is claimed for anti-phishing, marketplaces, professional identity, customer support, or agent payments in the initial paper.

\subsection{Red-Team Matrix}

A production scorer MUST be evaluated against:

\begin{itemize}
    \item dense Sybil receipt farms,
    \item slow-aged farms,
    \item purchased aged identities,
    \item compromised old identities,
    \item false positive attacks on sparse legitimate users,
    \item malicious negative attestations,
    \item issuer collusion,
    \item model poisoning,
    \item relay equivocation attempts,
    \item privacy correlation attempts,
    \item agent delegation bypass attempts.
\end{itemize}

\subsection{Evaluation Report Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.evaluation_report.v1",
  "model_id": "opensource-continuity-v0.1.0",
  "provider": "did:tsl:provider:continuity-labs",
  "dataset_commitments": ["0x...", "0x..."],
  "time_split": {"train_end": "2026-03-31", "test_start": "2026-04-01"},
  "metrics": {
    "auroc_bps": 9430,
    "auprc_bps": 7110,
    "ece_bps": 310,
    "sparse_identity_fpr_bps": 180,
    "red_team_detection_bps": 8820,
    "p95_latency_ms": 92,
    "privacy_leakage_bps": 2100
  },
  "promotion_gate_passed": true,
  "auditor_signature": "optional_auditor_signature",
  "provider_signature": "provider_signature"
}
\end{lstlisting}

% ============================================================
\section{Economic and Game-Theoretic Model}
% ============================================================

The economic objective is to make trustworthy evidence cheaper for honest users than for attackers, while making abusive strategies unprofitable at scale.

\subsection{Implementation Variants}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.21\textwidth} p{0.24\textwidth} X}
\toprule
Variant & Incentive Mechanism & Notes \\
\midrule
Token-free MVP & Subscriptions, API fees, enterprise contracts & Core validity independent of economics. \\
Bonded provider & Fiat, stablecoin, or token bond & Provider can lose bond after audited abuse. \\
Relay fee market & Per-checkpoint or per-proof fees & Does not affect proof validity. \\
Auditor reward & Bug bounty or fraud proof payout & Rewards detection of equivocation and provider abuse. \\
Full economic module & Staking, slashing, rewards & Optional adapter; never defines trustworthiness. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Honest Receipt Incentives}

Receipt value should reward quality, not raw count:

\begin{equation}
ReceiptValue_{ij}=\omega_c\cdot r_{ij}\cdot D_i\cdot D_j\cdot Q_j\cdot d_c(t-\tau)\cdot AppealState.
\end{equation}

This makes closed-cluster receipt farming asymptotically low value:

\begin{equation}
\lim_{InternalRatio(C)\rightarrow1}MarginalTrustGain(e_{internal})=0.
\end{equation}

\subsection{Spam Cost Model}

\begin{equation}
Profit_{spam}=N\cdot p_{success}\cdot V_{victim}-C_{message}-C_{identity}-C_{receipt}-C_{attestation}-p_{detect}Penalty.
\end{equation}

The protocol should reduce \(p_{success}\), increase \(C_{identity}\), increase \(C_{receipt}\), and increase \(p_{detect}\) without imposing excessive costs on legitimate new users.

\subsection{Sybil Farming Economics}

A farm strategy \(\mathcal{S}\) succeeds if it reaches a target domain threshold:

\begin{equation}
Success(\mathcal{S})=\mathbb{I}[S_i^d\geq \theta_d \land q_i\geq q_d].
\end{equation}

Expected attack ROI:

\begin{equation}
ROI(\mathcal{S})=\frac{P(Success)\cdot Benefit-Cost(\mathcal{S})-P(Detected)\cdot Penalty}{Cost(\mathcal{S})+\varepsilon}.
\end{equation}

A model promotion gate SHOULD require \(ROI(\mathcal{S})<0\) for reference attack profiles in high-risk domains.

\subsection{Reputation Laundering}

For an aged identity sold at price \(P_{sale}\):

\begin{equation}
Profit_{launder}=P_{sale}+AttackBenefit-C_{aging}-C_{receipts}-C_{attestations}-P_{drift}Penalty.
\end{equation}

Defenses:

\begin{itemize}
    \item ownership-sensitive key-change windows,
    \item value-based step-up checks,
    \item post-sale graph drift detection,
    \item attestation revalidation after control change,
    \item local relationship preservation so a new controller cannot inherit private trust automatically.
\end{itemize}

\subsection{Negative Claim Abuse}

\begin{equation}
Cost_{bad\_negative}=P_{appeal\_success}\cdot Penalty+ReputationLoss+AuditCost+LegalRisk.
\end{equation}

The system is robust only if:

\begin{equation}
Cost_{bad\_negative}>Benefit_{sabotage}.
\end{equation}

Therefore public negative claims require high issuer quality, evidence commitment, expiration, appeal, and reversal tracking.

% ============================================================
\section{Formal Security Model}
% ============================================================

\subsection{Assumptions}

The protocol relies on:

\begin{itemize}
    \item existential unforgeability of declared signature schemes,
    \item collision and preimage resistance of declared hashes,
    \item soundness of Merkle inclusion and consistency proofs,
    \item finality assumptions of settlement backends,
    \item secure key custody or timely revocation after compromise,
    \item at least one honest auditor or verifier observing public equivocation,
    \item honest execution of local client privacy controls,
    \item transparent provider governance for scoring outputs.
\end{itemize}

\subsection{Adversary Capabilities}

The adversary may create unlimited identities, generate arbitrary content, collude among identities, compromise keys, delay relay submissions, attempt log equivocation, corrupt weak issuers, poison model training data, submit malicious negative claims, exploit public timing leakage, and attempt agent delegation bypass.

The adversary cannot forge signatures for uncompromised keys, find hash collisions, or rewrite finalized checkpoints without violating stated assumptions.

\subsection{Security Games}

\begin{longtable}{>{\bfseries}p{0.24\textwidth} p{0.34\textwidth} p{0.30\textwidth}}
\toprule
Game & Adversary Goal & Win Condition \\
\midrule
Origin forgery & Create valid event for uncompromised key & Verifier accepts signature under active key not controlled by adversary. \\
Commitment binding & Open one commitment two ways & Same commitment verifies for two different contents or metadata values. \\
Inclusion forgery & Claim log inclusion falsely & Invalid Merkle path accepted for a settled root. \\
Checkpoint equivocation & Present conflicting roots & Two incompatible roots for the same log and tree size avoid auditor or verifier detection. \\
Revocation and backdating safety & Submit a newly signed event after revocation with an earlier self-declared time & Verifier accepts without trusted pre-revocation relay receipt, timestamp, inclusion promise, or checkpoint evidence. \\
Unlinkability & Link two commitments beyond policy & Adversary distinguishes same subject across scopes better than leakage budget permits. \\
Delegation scope & Prove out-of-scope action as allowed & Verifier accepts action outside effective delegation scope. \\
Assessment integrity & Forge provider assessment & Verifier accepts unsigned or wrong-provider assessment as valid. \\
\bottomrule
\end{longtable}

\subsection{Guarantees vs. Estimates}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.28\textwidth} X}
\toprule
Mechanism & What It Guarantees \\
\midrule
Signature & A holder of the private key signed the canonical payload, assuming no compromise. \\
Registry & Key state and provider state according to settled registry facts. \\
Hash commitment & Opened value matches committed value if salt and value are disclosed. \\
RFC 9162 inclusion proof & A typed commitment is included at a stated leaf index and cumulative tree size if the proof verifies. \\
Checkpoint and consistency proof & A cumulative root was advertised and is an append-only extension of a prior accepted root under RFC 9162 and settlement assumptions. \\
Auditor gossip & Equivocation becomes detectable if conflicting views are observed. \\
Attestation & Issuer made a signed claim; truth depends on evidence and issuer quality. \\
Continuity assessment & Calibrated estimate for one target action, domain, and policy; never proof of safety, intent, or universal trustworthiness. \\
Graph model & Statistical similarity and continuity evidence; not cryptographic truth. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Formal Invariants}

\begin{enumerate}
    \item Invalid signatures MUST fail regardless of any assessment output.
    \item A post-revocation first submission MUST fail unless the exact commitment has trusted pre-revocation time evidence.
    \item A verifier MUST recompute RFC 8785 JCS bytes before signature verification.
    \item Public commitments MUST NOT require raw content or exact receiver disclosure.
    \item Scoring provider signatures MUST be checked independently of relay signatures.
    \item Agent action authorization MUST check effective scope and revocation.
    \item Sparse evidence MUST NOT be mapped directly to maliciousness without adverse evidence.
\end{enumerate}

% ============================================================
\section{Agent Delegation Semantics}
% ============================================================

AI agents need verifiable authority, not just identity. A valid agent signature proves that an agent key signed an action. It does not prove that the principal authorized the action.

\subsection{Delegation Implementation Variants}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.21\textwidth} p{0.25\textwidth} X}
\toprule
Variant & Use & Rule \\
\midrule
Simple delegation & Low-risk read-only tools & Signed allow policy, short expiry. \\
Value-constrained delegation & Purchases and payments & Amount caps, counterparties, approval thresholds. \\
Workflow delegation & Enterprise workflows & Project, role, and tool constraints. \\
Subdelegation chain & Multi-agent systems & Parent must explicitly allow subdelegation; effective scope is intersection. \\
ZK-constrained delegation & Private parameters & Prove committed parameters satisfy limits. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Permission Language Requirements}

The permission language MUST be:

\begin{itemize}
    \item decidable,
    \item canonicalizable,
    \item monotone under scope intersection,
    \item parameter-aware,
    \item revocable,
    \item explainable to human and machine verifiers.
\end{itemize}

\subsection{Scope Grammar}

\begin{lstlisting}[style=tslcode]
Policy        := { Effect, Principal, Delegate, Resources, Actions, Constraints, Subdelegation }
Effect        := "allow" | "deny"
Resource      := Namespace ":" Path
Action        := Namespace "." Verb
Constraint    := TimeConstraint | ValueConstraint | CounterpartyConstraint | ToolConstraint | RateConstraint | ApprovalConstraint
Subdelegation := { allowed: boolean, max_depth: integer, allowed_actions: Action[] }
Decision      := allow only if at least one allow matches and no deny matches
\end{lstlisting}

\subsection{Delegation Policy Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.delegation_policy.v2",
  "policy_id": "0x...",
  "principal": "did:tsl:org:acme",
  "delegate": "did:tsl:agent:invoice-agent-7",
  "effect": "allow",
  "valid_from": "2026-05-26T00:00:00Z",
  "valid_until": "2026-06-26T00:00:00Z",
  "resources": ["invoice:approved_vendor/*", "purchase_order:project_alpha/*"],
  "actions": ["invoice.read", "invoice.request_approval", "purchase_order.draft"],
  "constraints": {
    "max_value_minor_units": 500000,
    "currency": "USD",
    "requires_human_approval_above_minor_units": 100000,
    "allowed_tools": ["invoice_api", "vendor_registry"],
    "denied_tools": ["wire_transfer_execute"],
    "allowed_counterparty_set_commitment": "0x...",
    "rate_limit": {"max_actions": 100, "window_seconds": 86400}
  },
  "subdelegation": {
    "allowed": false,
    "max_depth": 0
  },
  "parent_policy_id": null,
  "revocation_pointer": "0x...",
  "nonce": "0x...",
  "signature": "principal_signature"
}
\end{lstlisting}

\subsection{Agent Action Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.agent_action.v2",
  "action_id": "0x...",
  "agent": "did:tsl:agent:invoice-agent-7",
  "principal": "did:tsl:org:acme",
  "action": "invoice.request_approval",
  "resource": "invoice:approved_vendor/12345",
  "tool": "invoice_api",
  "parameters_commitment": "0x...",
  "parameter_disclosure_policy": "selective_or_zk",
  "delegation_chain_root": "0x...",
  "issued_at": "2026-05-26T00:00:00Z",
  "nonce": "0x...",
  "signature": "agent_signature"
}
\end{lstlisting}

\subsection{Effective Scope}

For chain \(D_0,D_1,\ldots,D_n\):

\begin{equation}
Scope_{eff}=\bigcap_{k=0}^{n}Scope(D_k).
\end{equation}

An action is allowed only if:

\begin{align}
Allowed(a,ctx,D_{0:n})={}&\bigwedge_{k=0}^{n}Signed(D_k)\land Active(D_k,t)\land \neg Revoked(D_k,t)\\
&\land SubdelegationValid(D_{0:n})\land a\in Scope_{eff}\land Constraints(ctx,Scope_{eff}).
\end{align}

Deny rules override allow rules.

\subsection{Authorization Algorithm}

\begin{lstlisting}[style=tslcode]
function verifyAgentAction(action, relayReceipt, checkpoint, delegationChain, parameters, policy): AgentDecision {
  verifyAgentSignature(action)
  verifyTrustedActionTime(action, relayReceipt, checkpoint, policy)
  verifyCanonicalActionCommitment(action, parameters)

  effectiveScope = universeScope()
  for delegation in delegationChain:
    verifyPrincipalSignature(delegation)
    assert activeAt(delegation, trustedActionTime(action, relayReceipt, checkpoint))
    assert !revokedAt(delegation, trustedActionTime(action, relayReceipt, checkpoint))
    assert subdelegationAllowedByParent(delegation)
    effectiveScope = intersect(effectiveScope, delegation.scope)

  if denyMatches(action, effectiveScope): return deny("explicit_deny")
  if !allowMatches(action, effectiveScope): return deny("no_matching_allow")
  if !constraintsSatisfied(action, parameters, effectiveScope): return deny("constraint_violation")
  if policy.requireSettlement: verifyInclusionAndCheckpoint(action)

  return allow("inside_scope")
}
\end{lstlisting}

\subsection{Proof That an Action Was Inside Scope}

A verifier checks:

\begin{enumerate}
    \item agent signature over canonical action,
    \item principal signatures over delegation policies,
    \item delegation chain inclusion or disclosure,
    \item active time window for every delegation,
    \item revocation state for every delegation,
    \item subdelegation permission and depth,
    \item action, resource, tool, value, counterparty, and rate constraints,
    \item event inclusion and settlement if policy requires it.
\end{enumerate}

For private values, use a circuit with public claim:

\begin{equation}
CommittedAmount \leq MaxAmount \land Counterparty \in ApprovedSet \land Tool \in AllowedTools.
\end{equation}

\subsection{Agent-Specific Failure Labels}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.30\textwidth} X}
\toprule
Failure & Meaning \\
\midrule
\texttt{agent\_signature\_invalid} & Agent did not sign the action or payload changed. \\
\texttt{delegation\_missing} & No valid principal authorization was provided. \\
\texttt{delegation\_expired} & Action occurred outside allowed time. \\
\texttt{delegation\_revoked} & Principal revoked authority before action. \\
\texttt{scope\_violation} & Action or resource is outside allowed scope. \\
\texttt{constraint\_violation} & Amount, counterparty, tool, rate, or approval rule failed. \\
\texttt{subdelegation\_not\_allowed} & Agent attempted unauthorized subdelegation. \\
\texttt{settlement\_missing} & Policy required checkpoint settlement but proof was missing. \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Threat Model}
% ============================================================

\subsection{Sybil Farms}

Attackers create many identities that interact with each other.

Defenses:

\begin{itemize}
    \item diverse counterparty weighting,
    \item community-escape metrics,
    \item issuer-quality-capped, evidence-bound attestations,
    \item rate limits for new identities,
    \item cluster anomaly detection,
    \item economic or proof-of-personhood optional add-ons,
    \item decay functions for low-quality internal edges.
\end{itemize}

\subsection{Reputation Laundering}

Attackers slowly build reputation, then sell or weaponize accounts.

Defenses:

\begin{itemize}
    \item behavioral drift detection,
    \item key/device continuity checks,
    \item sudden target-community change alerts,
    \item high-value action re-verification,
    \item receipt-quality weighting,
    \item post-compromise recovery and warning flows.
\end{itemize}

\subsection{Compromised Identity}

An attacker steals a valid signing key.

Defenses:

\begin{itemize}
    \item smart-account recovery,
    \item device-scoped keys,
    \item revocation registry,
    \item anomaly-triggered step-up verification,
    \item short-lived agent/session keys,
    \item delegated signing policies.
\end{itemize}

\subsection{Revocation Backdating and Post-Revocation Submission}

An attacker with a compromised key signs a new event after revocation but assigns an earlier \texttt{issued\_at}. A verifier that checks only key status at \texttt{issued\_at} accepts a forged historical event.

Defenses:

\begin{itemize}
    \item signed relay receipt with \texttt{relay\_received\_at},
    \item inclusion promise binding the exact commitment and merge deadline,
    \item monotonic \texttt{checkpoint\_time},
    \item rejection of first-seen post-revocation submissions,
    \item acceptance after revocation only with trusted pre-revocation evidence,
    \item test vectors covering backdated \texttt{issued\_at} and stale caches.
\end{itemize}

\subsection{Metadata Correlation}

Observers infer private relationships from public commitments.

Defenses:

\begin{itemize}
    \item public logs containing only salted opaque receipt commitments,
    \item pairwise identifiers and selective receiver-binding disclosure,
    \item salting and domain separation,
    \item batching and delayed publication,
    \item optional local-only mode,
    \item aggregate disclosure,
    \item private set intersection for contact verification,
    \item zero-knowledge proofs for thresholds.
\end{itemize}

\subsection{Malicious Negative Attestations}

Bad actors use warnings or reports to harass competitors.

Defenses:

\begin{itemize}
    \item issuer reputation,
    \item evidence commitments,
    \item appeal process,
    \item rate limits,
    \item separation of private warnings from public labels,
    \item defamation-aware governance,
    \item human review for high-impact actions.
\end{itemize}

\subsection{Model Poisoning}

Attackers manipulate training data or graph features.

Defenses:

\begin{itemize}
    \item robust training sets,
    \item adversarial evaluation,
    \item provider audit logs,
    \item model cards,
    \item signed model versions,
    \item shadow models,
    \item user-selectable providers,
    \item local policy overrides.
\end{itemize}

% ============================================================
\section{Initial Domain and Future Use Cases}
% ============================================================

\subsection{Normative Initial Domain: Open-Source Maintainer Continuity}

The first implementation and paper focus on code releases. A verifier checks the release signature, maintainer key lineage, trusted-time and revocation state, cumulative-log inclusion, repository or package-registry control continuity, prior release trajectory, and domain-specific drift. The default response to unexplained drift is step-up review, not an accusation of fraud.

The benchmark target is a concrete release event. Evaluation uses public histories and reproducible compromise-like scenarios with time-split and project-split holdouts. The strongest claim is that the profile can be calibrated to distinguish ordinary continuity from specified takeover or compromise scenarios at measured false-positive and false-negative rates.

\subsection{Prospective Domains}

Anti-phishing, marketplace reputation, professional identity, customer support, and agent authorization remain design sketches. They MAY reuse the evidence and log layer, but each needs its own policy, ground truth, privacy review, calibration, threshold selection, and appeals process before any scientific or product claim is made.

% ============================================================
\section{Killer Demos}
% ============================================================

\begin{marketbox}{Primary Demo: Maintainer Continuity and Compromise Step-Up}
A package release carries a valid signature, but the release is first submitted after the signing key's revocation cutoff and supplies only a backdated \texttt{issued\_at}. Verification fails the trusted-time gate. In a second scenario, a valid pre-revocation release has unusual dependency and control changes; the continuity profile recommends step-up review rather than declaring the maintainer malicious.
\end{marketbox}

\begin{marketbox}{Secondary Demo: Privacy-Preserving Review Receipt}
A reviewer co-signs a receipt. The public cumulative log contains only a salted opaque receipt commitment. An authorized verifier receives the full receipt and pairwise binding proof, while public observers cannot read the exact reviewer-maintainer edge.
\end{marketbox}

\begin{marketbox}{Future Demos, Not Yet Validated}
Phishing, portable marketplace evidence, and agent-to-agent authorization may be demonstrated as future profiles, but they MUST be labeled exploratory until domain-specific evaluation is complete.
\end{marketbox}

% ============================================================
\section{Product Surface}
% ============================================================

The product surface is only the visible edge of the protocol. These badges, web views, extensions, wallets, and dashboards are reference interfaces for a deeper trust-envelope layer. They should never be described as the canonical \TSL{} application, because the canonical object is the verifiable proof itself.


\subsection{Consumer Badge}

\begin{lstlisting}[style=tslcode]
TSL Release Proof Valid
Release continuity: Strong evidence
Policy: opensource_release_continuity.v1
Recommended action: Allow with monitoring
Why:
- Signature valid under current key registry
- Identity has 31 months of continuity
- 142 reciprocal receipts
- No active revocation
- Behavior consistent with previous interactions
\end{lstlisting}

\subsection{Caution Badge}

\begin{lstlisting}[style=tslcode]
Insufficient Release Evidence
Continuity: Not assessed
Recommended action: Step up or review
Why:
- Signature is valid
- Identity is 2 days old
- No prior relationship with you
- No trusted attestations disclosed
\end{lstlisting}

\subsection{High-Risk Badge}

\begin{lstlisting}[style=tslcode]
Release Verification Failed
Continuity assessment: Suppressed
Why:
- Key was revoked 6 hours ago
- Message signed with revoked key
- Sender claims to be a known business but uses a new TrustID
- Similar behavior observed in flagged phishing cluster
\end{lstlisting}

% ============================================================
\section{MVP Roadmap}
% ============================================================

\subsection{Phase 0: Protocol Spec}

Deliverables:

\begin{itemize}
    \item canonical object schemas,
    \item canonical serialization rules,
    \item signing and verification library,
    \item event commitment format,
    \item receipt format,
    \item revocation semantics,
    \item transparency-log spec,
    \item verification API.
\end{itemize}

\subsection{Phase 1: Portable Proof Link Reference Client}

Build a reference client where a user or agent can:

\begin{itemize}
    \item create a \TrustID{},
    \item sign a message or claim,
    \item generate a proof link,
    \item share the proof anywhere,
    \item allow a recipient to verify and co-sign a receipt.
\end{itemize}

This phase needs no platform integration and no destination application. Existing communication channels simply carry proof links.

\subsection{Phase 2: Browser Extension}

The extension detects \TSL{} proof links and embedded envelopes on common web surfaces. It does not need deep API integration. It only needs to parse, verify, and render.

\subsection{Phase 3: Transparency Log and Anchoring}

Build:

\begin{itemize}
    \item append-only Merkle log,
    \item inclusion proofs,
    \item consistency proofs,
    \item checkpoint contract,
    \item revocation registry,
    \item identity registry.
\end{itemize}

\subsection{Phase 4: Open-Source Continuity Assessment Engine}

Implement only the \texttt{opensource\_release\_continuity.v1} profile with transparent features, time-split evaluation, calibration, uncertainty, and step-up explanations. Do not add cross-domain graph intelligence until the first profile is reproducible.

\subsection{Phase 5: Agent SDK}

Ship SDKs for AI agents, wallets, and enterprise workflows.

\begin{lstlisting}[style=tslcode]
npm install @tsl/proof
pip install tsl-proof
cargo add tsl-proof
\end{lstlisting}

% ============================================================
\section{Reference APIs}
% ============================================================

\subsection{Create TrustID}

\begin{lstlisting}[style=tslcode]
POST /v1/identity/create

Request:
{
  "public_key": "z6Mk...",
  "controller_type": "local | smart_account | enterprise | agent",
  "recovery_policy_commitment": "0x..."
}

Response:
{
  "trust_id": "did:tsl:eip155-8453:0xabc...",
  "created_at": "2026-05-25T00:00:00Z",
  "registry_tx": "0x..."
}
\end{lstlisting}

\subsection{Commit Event}

\begin{lstlisting}[style=tslcode]
POST /v1/commitments

Request:
{
  "event_commitment": "0x...",
  "sender": "did:tsl:eip155-8453:0xabc...",
  "signature": "0x...",
  "issued_at": "2026-05-25T00:01:00Z"
}

Response:
{
  "accepted": true,
  "relay": "relay-3.tsl.network",
  "log_index": 184293,
  "shard": "00af",
  "relay_receipt": {"type": "tsl.relay_receipt.v1", "relay_received_at": "2026-05-25T00:01:04Z", "promised_tree_size": 184294, "signature": "0x..."}
}
\end{lstlisting}

\subsection{Get Proof}

\begin{lstlisting}[style=tslcode]
GET /v1/proofs/0xEVENTCOMMITMENT

Response:
{
  "event_commitment": "0x...",
  "relay_receipt": {"type": "tsl.relay_receipt.v1", "...": "..."},
  "checkpoint": {
    "log_id": "tsl-log:00af",
    "shard": "00af",
    "tree_size": 184294,
    "root_hash": "0x...",
    "checkpoint_time": "2026-05-25T00:05:00Z",
    "settlement_tx": "0x..."
  },
  "inclusion_proof": {"type": "tsl.inclusion_proof.v1", "...": "..."},
  "consistency_proof": {"type": "tsl.consistency_proof.v1", "...": "..."}
}
\end{lstlisting}

\subsection{Verify}

\begin{lstlisting}[style=tslcode]
POST /v1/verify

Request:
{
  "message": "optional raw message if user chooses to disclose",
  "envelope": { "...": "..." },
  "proof": { "...": "..." },
  "verifier_context": {
    "local_relationship": "optional_private_context"
  }
}

Response:
{
  "signature_valid": true,
  "key_active": true,
  "included_in_log": true,
  "checkpoint_settled": true,
  "revoked": false,
  "continuity_label": "likely_continuous",
  "continuity_bps": 8200,
  "explanation": [
    "Signature valid",
    "Key active",
    "Event included in checkpoint",
    "Strong reciprocal receipt history"
  ]
}
\end{lstlisting}

% ============================================================
\section{Smart Contracts}
% ============================================================

\subsection{Registry Interfaces}

\begin{lstlisting}[style=tslcode]
interface ITrustIDRegistry {
    function register(bytes32 trustId, bytes32 controller, bytes32 policyCommitment) external;
    function rotateKey(bytes32 trustId, bytes32 oldKey, bytes32 newKey, bytes calldata proof) external;
    function revokeKey(bytes32 trustId, bytes32 key, uint8 reason, bytes calldata proof) external;
    function getActiveKey(bytes32 trustId) external view returns (bytes32);
    function isRevoked(bytes32 trustId, bytes32 key) external view returns (bool);
}

interface ICheckpointRegistry {
    function submitCheckpoint(
        bytes32 logId,
        bytes32 shard,
        uint64 treeSize,
        bytes32 rootHash,
        uint64 checkpointTime,
        uint64 previousTreeSize,
        bytes32 previousCheckpointHash,
        bytes calldata relaySignature
    ) external;

    function getCheckpoint(bytes32 logId, uint64 treeSize) external view returns (Checkpoint);
}

interface IProviderRegistry {
    function registerProvider(bytes32 providerId, bytes32 publicKey, bytes32 policyCommitment) external;
    function registerModel(bytes32 providerId, bytes32 modelId, bytes32 modelCardCommitment) external;
    function revokeProvider(bytes32 providerId, uint8 reason) external;
}
\end{lstlisting}

\subsection{Contract Principle}

Contracts should remain minimal. They settle state roots and registry facts. Complex scoring, graph computation, and privacy-sensitive operations happen off-chain.

% ============================================================
\section{Governance}
% ============================================================

\TSL{} must avoid becoming one centralized blacklist or social-credit oracle.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.25\textwidth} X}
\toprule
Layer & Governance Principle \\
\midrule
Protocol schema & Open standard and versioned compatibility \\
Reference clients & Open-source implementation \\
Identity registry & Neutral infrastructure \\
Scoring providers & Plural, inspectable, and user-selectable \\
Negative claims & Evidence-bound, appealable, and issuer-accountable \\
Model updates & Signed model cards and changelogs \\
User UX & Probabilistic, explanatory labels rather than absolute accusations \\
Enterprise policies & Configurable without fragmenting protocol verification \\
\bottomrule
\end{tabularx}
\end{center}

\begin{warningbox}{Ethical Constraint}
The protocol should prove continuity, not enforce conformity. It should help users evaluate risk, not create an irreversible global reputation caste system.
\end{warningbox}

% ============================================================
\section{Business Model}
% ============================================================

The base protocol should be open. The company can monetize products and infrastructure around it.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.26\textwidth} X}
\toprule
Revenue Line & Description \\
\midrule
Enterprise verification API & Banks, marketplaces, SaaS, recruiting, support platforms \\
Agent trust SDK & AI-agent platforms, tool providers, autonomous commerce systems \\
Risk intelligence & Scam cluster feeds, fraud intelligence, trust analytics \\
Hosted relay infrastructure & Managed logs, checkpoints, monitoring, uptime guarantees \\
Consumer premium & Identity recovery, advanced privacy proofs, professional profile \\
Marketplace verification & Seller/buyer trust receipts and portable transaction history \\
Developer tooling & Maintainer signing, package trust, CI/CD release verification \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Go-to-Market}
% ============================================================

The first wedge is open-source maintainer and release continuity because release histories, signatures, ownership transitions, package metadata, and compromise-like scenarios are comparatively public and reproducible.

\subsection{Initial Product}

Ship a command-line verifier, CI integration, release proof bundle, maintainer-key rotation flow, cumulative transparency log, and browser/web proof view for code releases. The product claim is limited to verifying protocol facts and producing a calibrated release-continuity assessment under \texttt{opensource\_release\_continuity.v1}.

\subsection{Expansion Rule}

A new domain is added only after it has a named policy, dataset statement, privacy review, deterministic profile, calibration report, red-team scenarios, threshold-cost analysis, and appeal path. Anti-phishing, marketplaces, professional identity, customer support, and agent commerce are expansion hypotheses rather than initial proof points.

\subsection{Adoption Loop}

A maintainer signs a release, shares a proof bundle, a verifier checks it, and authorized reviewers may add private or selective receipts. The resulting evidence improves future release continuity without publishing the exact review graph.

% ============================================================
\section{Competitive Positioning}
% ============================================================

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.26\textwidth} X X}
\toprule
Category & What It Solves & What It Misses \\
\midrule
KYC providers & Legal identity verification & Privacy, pseudonymity, behavioral continuity, portability across contexts \\
Password/auth providers & Account access & Trustworthiness, graph behavior, counterparty receipts \\
Email security & Phishing detection & Cross-platform continuity and user-owned proofs \\
Platform reputation & Local marketplace trust & Portability and cryptographic ownership \\
DID wallets & Identifier control & Behavioral trust, receipts, graph intelligence \\
Blockchains & Durable settlement & Communication trust semantics and privacy UX \\
AI scam detectors & Pattern detection & Verifiable identity history and user-owned evidence \\
\TSL{} & Portable continuity evidence & Initial validated profile is limited to open-source maintainer and release continuity \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Technical Differentiation}
% ============================================================

\TSL{} combines eight capabilities that are usually separate:

\begin{enumerate}
    \item cryptographic identity,
    \item message/event signatures,
    \item counterparty receipts,
    \item append-only transparency logs,
    \item blockchain-anchored checkpoints,
    \item key revocation and recovery,
    \item privacy-preserving graph intelligence,
    \item signed, plural continuity assessments.
\end{enumerate}

The novelty is not ``put messages on a blockchain.'' That is the wrong framing. The novelty is:

\begin{quote}
\textbf{Build a portable continuity-evidence substrate whose protocol facts are cryptographically auditable and whose assessments remain domain- and policy-bound.}
\end{quote}

% ============================================================
\section{Minimum Security Requirements}
% ============================================================

A production implementation requires:

\begin{itemize}
    \item audited cryptographic libraries,
    \item RFC 8785 JCS canonicalization to prevent signature ambiguity,
    \item domain-separated commitments,
    \item replay protection with nonces plus trusted relay-receive and checkpoint time binding,
    \item robust key rotation semantics,
    \item revocation propagation,
    \item cumulative RFC 9162 inclusion and consistency proofs,
    \item rate limits and anti-spam controls,
    \item privacy threat modeling,
    \item user-controlled disclosure,
    \item signed model versions,
    \item appeal mechanisms,
    \item abuse review for high-impact labels.
\end{itemize}

% ============================================================
\section{Reference Implementation Plan}
% ============================================================

\subsection{Repository Structure}

\begin{lstlisting}[style=tslcode]
tsl/
  specs/
    identity.schema.json
    event_commitment.schema.json
    receipt_commitment.schema.json
    attestation.schema.json
    revocation.schema.json
    checkpoint.schema.json
  packages/
    tsl-core-ts/
    tsl-core-rust/
    tsl-core-python/
  clients/
    web-verifier/
    browser-extension/
    cli/
    agent-sidecar/
  services/
    relay/
    transparency-log/
    checkpoint-submitter/
    provider-registry/
  contracts/
    TrustIDRegistry.sol
    RevocationRegistry.sol
    CheckpointRegistry.sol
    ProviderRegistry.sol
  models/
    scoring-reference/
    graph-features/
    anomaly-detection/
  docs/
    whitepaper.tex
    protocol.md
    threat-model.md
\end{lstlisting}

\subsection{First 90 Days}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.18\textwidth} X}
\toprule
Period & Deliverables \\
\midrule
Days 1--15 & Protocol schemas, signing library, canonical serialization, \TrustID{} generation \\
Days 16--30 & Proof-link reference client, message signing, basic verification, local encrypted store \\
Days 31--45 & Receipt flow, append-only log prototype, inclusion proofs \\
Days 46--60 & Revocation registry, checkpoint contract, first blockchain anchor \\
Days 61--75 & Release verifier UI, CI integration, maintainer rotation UX, explanation engine \\
Days 76--90 & Open-source continuity benchmark, compromise simulations, calibration report, public test vectors \\
\bottomrule
\end{tabularx}
\end{center}


% ============================================================
\section{Engineering Implementation Specification}
% ============================================================

This section converts the protocol architecture into an engineer-executable backend specification. The reference implementation must be treated as a protocol stack, not as a monolithic application. A web app, extension, dashboard, or enterprise console is only a client of the protocol.

\begin{principlebox}{Implementation Boundary}
The canonical product is the protocol: object schemas, serialization rules, cryptographic verification, identity resolution, revocation semantics, Merkle proof verification, checkpoint settlement, relay behavior, and signed continuity assessments. Applications are optional interfaces and carriers. No single website, dashboard, wallet, or extension is the protocol.
\end{principlebox}

\subsection{Normative Language}

The following words are used with implementation meaning:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.18\textwidth} X}
\toprule
Term & Meaning \\
\midrule
MUST & Required for protocol compatibility. Implementations that violate a MUST are non-compliant. \\
SHOULD & Strong recommendation. Implementations may differ only with a documented reason. \\
MAY & Optional extension that must not break compatibility. \\
LOCAL & Data or computation controlled by the user, device, organization, or private verifier. \\
PUBLIC & Data visible in logs, registries, chain state, or public APIs. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Decentralization Invariants}

A compliant implementation MUST preserve these invariants:

\begin{enumerate}
    \item A valid \TSL{} proof MUST be verifiable without the original hosted website.
    \item A valid \TSL{} proof MUST NOT require the user to join a destination application or social network.
    \item Raw message content MUST NOT be required for public log inclusion.
    \item The canonical event validity MUST NOT depend on any continuity or risk assessment.
    \item The canonical event validity MUST NOT depend on a future token, staking tier, subscription plan, or payment method.
    \item Any compatible relay MAY accept commitments if it follows the relay validation rules.
    \item Any compatible verifier MAY verify signatures, revocation state, inclusion proofs, and settled checkpoints.
    \item Scoring providers MUST be plural and signed; the base protocol MUST NOT require a single centralized scoring oracle.
    \item Revocation MUST be checkable from registry state and signed revocation events.
    \item Checkpoint proofs MUST be portable across settlement backends through a common verification adapter.
\end{enumerate}

\subsection{Required Implementation Modules}

The reference repository SHOULD contain these modules:

\begin{lstlisting}[style=tslcode]
tsl/
  specs/
    json-schema/
    openapi/
    test-vectors/
  packages/
    core-ts/             # canonicalization, hashes, signatures, schemas
    core-rust/           # high-assurance verifier and log implementation
    core-python/         # scoring and data tooling bindings
    verifier-ts/         # browser/node verification package
    client-sdk-ts/       # signing, proof links, local store
    agent-sdk-python/    # AI-agent identity and delegated signing
  services/
    relay-node/          # commitment intake, receipts, proofs, gossip
    log-node/            # Merkle log, shard manager, checkpoint builder
    checkpoint-submitter/# submits roots to settlement backend
    resolver-node/       # identity, key, revocation, provider resolver
    verifier-api/        # hosted verifier wrapper around pure library
    scoring-provider/    # optional signed assessment provider
    auditor-node/        # log consistency and equivocation checks
  contracts/
    src/
      TrustIDRegistry.sol
      RevocationRegistry.sol
      CheckpointRegistry.sol
      ProviderRegistry.sol
      GovernanceRegistry.sol
    test/
    script/
  clients/
    web-verifier/
    browser-extension/
    cli/
    agent-sidecar/
  infra/
    docker-compose.yml
    k8s/
    terraform/
  docs/
    implementation-spec.tex
    protocol.md
    threat-model.md
    operations.md
\end{lstlisting}

% ============================================================
\section{Canonical Data and Cryptography}
% ============================================================

\subsection{Encoding Rules: RFC 8785 JCS}

Every signed or hashed JSON object MUST be canonicalized exactly with RFC 8785 JSON Canonicalization Scheme (JCS) \cite{jcs}. \TSL{} does not define an alternative canonical JSON format.

\begin{enumerate}
    \item Input MUST satisfy the I-JSON constraints required by RFC 8785, including no duplicate object member names and valid Unicode strings.
    \item Canonicalization MUST use RFC 8785 primitive serialization, deterministic property sorting, and UTF-8 output exactly. Implementations MUST NOT substitute sorting by locale, UTF-8 byte sequence, or an informal ``Unicode code point'' rule.
    \item Signed core objects in this profile MUST NOT contain JSON floating-point values. Integral JSON numbers MUST be within the interoperable I-JSON range; larger integers, arbitrary-precision values, and binary values MUST use schema-defined decimal strings, hexadecimal strings, or multibase strings.
    \item Arrays preserve order. Object members whose order is semantically irrelevant MUST be sorted before array construction by the object's normative algorithm; JCS itself does not reorder arrays.
    \item Timestamps MUST be schema-valid RFC 3339 UTC strings ending in \texttt{Z}. The signer-controlled event field is \texttt{issued\_at}; trusted relay and checkpoint times are carried in their own signed objects.
    \item Unknown fields are rejected for core object types unless the version declares an extension namespace.
\end{enumerate}

Conformance suites MUST include the RFC 8785 number-serialization and property-order vectors, including published errata, plus TSL-specific cross-language vectors for every signed object. A library that emits different JCS bytes is non-compliant.

\begin{warningbox}{No New Canonical JSON Dialect}
The canonical byte sequence is RFC 8785 JCS output. Any future delta requires a new object major version, a precise byte-level specification, and cross-language vectors; it MUST NOT be introduced as an undocumented implementation convenience.
\end{warningbox}

\subsection{Domain Separation}

Every hash MUST include a domain tag. The tag prevents a hash intended for one object type from being reused as another.

\begin{lstlisting}[style=tslcode]
TSL_IDENTITY_V1        = "tsl.identity.v1"
TSL_EVENT_V1           = "tsl.event_commitment.v1"
TSL_RECEIPT_V1         = "tsl.receipt_commitment.v1"
TSL_RECEIPT_LOG_V1     = "tsl.receipt_log_entry.v1"
TSL_RELAY_RECEIPT_V1   = "tsl.relay_receipt.v1"
TSL_ATTESTATION_V1     = "tsl.attestation.v1"
TSL_REVOCATION_V1      = "tsl.revocation.v1"
TSL_CHECKPOINT_V1      = "tsl.batch_checkpoint.v1"
TSL_LOG_ENTRY_V1       = "tsl.log_entry.v1"
TSL_ASSESSMENT_V1      = "tsl.continuity_assessment.v1"
TSL_ASSESSMENT_V2      = "tsl.continuity_assessment.v2"
TSL_PROOF_BUNDLE_V1    = "tsl.proof_bundle.v1"
TSL_DELEGATION_V2      = "tsl.delegation_policy.v2"
TSL_AGENT_ACTION_V2    = "tsl.agent_action.v2"
\end{lstlisting}

The generic hash function is:

\begin{equation}
\hash_T(x) = \hash(\operatorname{utf8}(T) \parallel \texttt{0x00} \parallel x).
\end{equation}

\subsection{Reference Crypto Suite}

The MVP crypto suite SHOULD use:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} X}
\toprule
Primitive & Reference Choice \\
\midrule
Signature & Ed25519 as specified by RFC 8032 for local, maintainer, relay, and agent keys; RFC 8032 Section 7 vectors are mandatory. \\
Smart account signature & EIP-712-compatible signature or account abstraction validation where applicable \\
Hash & SHA-256 for the v1 suite. A different hash requires a separately versioned suite and new vectors. \\
Commitment salt & 256-bit random salt from a cryptographically secure random generator \\
Nonce & 256-bit random nonce per event \\
Merkle log & Cumulative RFC 9162 SHA-256 Merkle Tree Hash, inclusion proofs, and consistency proofs. \\
Encryption at rest & XChaCha20-Poly1305 or AES-256-GCM for local private data \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Core TypeScript Interfaces}

\begin{lstlisting}[style=tslcode]
export type Hex32 = `0x${string}`;      // exactly 32 bytes encoded as lowercase hex
export type HexSig = `0x${string}`;     // signature bytes
export type TrustID = string;           // did:tsl:<method>:<identifier>
export type RFC3339 = string;

export interface VerificationMethodV1 {
  id: string;
  type: "ed25519" | "secp256k1" | "smart_account";
  public_key: string;
  status: "active" | "revoked" | "expired";
  created_at: RFC3339;
  expires_at?: RFC3339;
}

export interface EventCommitmentV1 {
  type: "tsl.event_commitment.v1";
  event_class: "message" | "transaction" | "attestation" | "agent_call" | "code_release";
  sender: TrustID;
  signing_key_id: string;
  receiver_commitment?: Hex32;
  content_commitment: Hex32;
  metadata_commitment?: Hex32;
  previous_event_commitment?: Hex32;
  issued_at: RFC3339;
  nonce: Hex32;
  disclosure_policy: "local_only" | "commitment_only" | "selective" | "public";
  signature: HexSig;
}
\end{lstlisting}

% ============================================================
\section{Canonical Object Schemas}
% ============================================================

This section defines the minimum JSON Schema shape for production validation. The full repository SHOULD contain machine-readable schema files under \texttt{specs/json-schema/}.

\subsection{Identity Schema}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/identity.v1.json",
  "type": "object",
  "required": ["type", "id", "controller", "created_at", "verification_methods"],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.identity.v1" },
    "id": { "type": "string", "pattern": "^did:tsl:" },
    "controller": { "type": "string" },
    "created_at": { "type": "string", "format": "date-time" },
    "verification_methods": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "type", "public_key", "status", "created_at"],
        "additionalProperties": false,
        "properties": {
          "id": { "type": "string" },
          "type": { "enum": ["ed25519", "secp256k1", "smart_account"] },
          "public_key": { "type": "string" },
          "status": { "enum": ["active", "revoked", "expired"] },
          "created_at": { "type": "string", "format": "date-time" },
          "expires_at": { "type": "string", "format": "date-time" }
        }
      }
    },
    "recovery": { "type": "object" },
    "privacy_policy_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" }
  }
}
\end{lstlisting}

\subsection{Event Commitment Schema}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/event_commitment.v1.json",
  "type": "object",
  "required": [
    "type", "event_class", "sender", "signing_key_id",
    "content_commitment", "issued_at", "nonce", "disclosure_policy", "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.event_commitment.v1" },
    "event_class": { "enum": ["message", "transaction", "attestation", "agent_call", "code_release"] },
    "sender": { "type": "string", "pattern": "^did:tsl:" },
    "signing_key_id": { "type": "string" },
    "receiver_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "content_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "metadata_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "previous_event_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "issued_at": { "type": "string", "format": "date-time" },
    "nonce": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "disclosure_policy": { "enum": ["local_only", "commitment_only", "selective", "public"] },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}
\end{lstlisting}

\subsection{Receipt Commitment Schema}

The full receipt schema is private or selectively disclosed. Public logs store only \texttt{receipt\_log\_entry.v1}.

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/receipt_commitment.v1.json",
  "type": "object",
  "required": ["type", "event_commitment", "receiver_pairwise_id", "signing_key_id", "receipt_class", "issued_at", "signature"],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.receipt_commitment.v1" },
    "event_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "receiver_pairwise_id": { "type": "string", "pattern": "^did:tsl:pairwise:" },
    "signing_key_id": { "type": "string" },
    "receipt_class": { "enum": ["received", "replied", "transacted", "completed", "disputed"] },
    "issued_at": { "type": "string", "format": "date-time" },
    "metadata_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}

{
  "$id": "https://spec.tsl.network/schemas/receipt_log_entry.v1.json",
  "type": "object",
  "required": ["type", "receipt_commitment"],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.receipt_log_entry.v1" },
    "receipt_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" }
  }
}
\end{lstlisting}

\subsection{Checkpoint Schema}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/batch_checkpoint.v1.json",
  "type": "object",
  "required": [
    "type", "log_id", "shard", "tree_size", "root_hash", "checkpoint_time",
    "previous_tree_size", "previous_checkpoint_hash", "relay_id", "relay_signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.batch_checkpoint.v1" },
    "log_id": { "type": "string" },
    "shard": { "type": "string", "pattern": "^[0-9a-f]{4,16}$" },
    "tree_size": { "type": "integer", "minimum": 0 },
    "root_hash": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "checkpoint_time": { "type": "string", "format": "date-time" },
    "previous_tree_size": { "type": "integer", "minimum": 0 },
    "previous_checkpoint_hash": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "settlement_backend": { "type": "string" },
    "settlement_tx": { "type": "string" },
    "relay_id": { "type": "string", "pattern": "^did:tsl:" },
    "relay_signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}
\end{lstlisting}

% ============================================================
\section{Backend Service Architecture}
% ============================================================

\subsection{Service Map}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} p{0.18\textwidth} X}
\toprule
Service & Port & Responsibility \\
\midrule
relay-node & 8080 & Accept event commitments, opaque receipt commitments, attestations, and revocations; validate and enqueue them. \\
log-node & 8081 & Maintain sharded append-only Merkle logs; produce inclusion and consistency proofs. \\
resolver-node & 8082 & Resolve \TrustID{}s, active keys, revoked keys, providers, and model versions. \\
checkpoint-submitter & worker & Periodically submit checkpoint roots to settlement contracts. \\
verifier-api & 8083 & Hosted wrapper around pure verifier library. Not required for protocol validity. \\
scoring-provider & 8084 & Optional feature extraction, scoring, and signed continuity assessments. \\
auditor-node & 8085 & Monitor logs, verify checkpoints, detect equivocation, and publish audit reports. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Reference Data Flow}

\begin{lstlisting}[style=tslcode]
1. Client creates an unsigned event with issued_at.
2. Client canonicalizes the unsigned object with RFC 8785 JCS.
3. Client signs the domain-separated event hash with an active key.
4. Client submits the event commitment to a relay.
5. Relay validates schema, JCS bytes, signature, key state, nonce, and revocation state.
6. Relay records relay_received_at and returns a signed relay receipt / inclusion promise.
7. Log node appends a typed entry to the cumulative identity-prefix shard log.
8. Log node returns an RFC 9162 inclusion proof at cumulative tree_size n.
9. At checkpoint cadence, log node signs (log_id, n, root_hash, checkpoint_time).
10. Auditor verifies RFC 9162 consistency from the prior checkpoint tree size.
11. Checkpoint submitter anchors the checkpoint to the settlement backend.
12. Verifier checks event signature, three-time binding, revocation, inclusion, consistency context, and settlement policy.
\end{lstlisting}

\subsection{Queue Topics}

\begin{lstlisting}[style=tslcode]
tsl.commitments.accepted.v1
tsl.receipt_commitments.accepted.v1
tsl.attestations.accepted.v1
tsl.revocations.accepted.v1
tsl.checkpoints.ready.v1
tsl.checkpoints.settled.v1
tsl.audit.findings.v1
\end{lstlisting}

The queue implementation MAY be Kafka, NATS JetStream, Redpanda, Redis Streams, or another durable queue. Message payloads MUST be canonical objects or pointers to immutable stored canonical bytes.

% ============================================================
\section{Database Implementation}
% ============================================================

The reference backend uses PostgreSQL for relay, resolver, and log-node state. Local clients SHOULD use SQLite or IndexedDB for private data. The public protocol does not require a specific database engine.

\subsection{PostgreSQL Schema}

\begin{lstlisting}[style=tslcode]
CREATE TABLE trust_identities (
    trust_id TEXT PRIMARY KEY,
    controller TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    identity_document JSONB NOT NULL,
    identity_hash TEXT NOT NULL CHECK (identity_hash ~ '^0x[0-9a-f]{64}$'),
    latest_checkpoint_hash TEXT,
    created_block_number BIGINT,
    created_tx_hash TEXT,
    inserted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE verification_keys (
    trust_id TEXT NOT NULL REFERENCES trust_identities(trust_id),
    key_id TEXT NOT NULL,
    key_type TEXT NOT NULL,
    public_key TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active','revoked','expired')),
    created_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    revocation_reason TEXT,
    PRIMARY KEY (trust_id, key_id)
);

CREATE TABLE revocations (
    revocation_hash TEXT PRIMARY KEY CHECK (revocation_hash ~ '^0x[0-9a-f]{64}$'),
    trust_id TEXT NOT NULL,
    key_id TEXT NOT NULL,
    reason_class TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    effective_at TIMESTAMPTZ NOT NULL,
    relay_received_at TIMESTAMPTZ NOT NULL,
    checkpoint_time TIMESTAMPTZ,
    replacement_key_id TEXT,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE log_entries (
    log_id TEXT NOT NULL,
    shard TEXT NOT NULL,
    log_index BIGINT NOT NULL,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('event','receipt_commitment','attestation','revocation','delegation')),
    entry_commitment TEXT NOT NULL CHECK (entry_commitment ~ '^0x[0-9a-f]{64}$'),
    canonical_leaf_input BYTEA NOT NULL,
    relay_id TEXT NOT NULL,
    relay_received_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (log_id, log_index),
    UNIQUE (log_id, entry_commitment)
);

CREATE TABLE event_commitments (
    commitment_hash TEXT PRIMARY KEY CHECK (commitment_hash ~ '^0x[0-9a-f]{64}$'),
    sender_trust_id TEXT NOT NULL,
    signing_key_id TEXT NOT NULL,
    event_class TEXT NOT NULL,
    content_commitment TEXT NOT NULL,
    receiver_commitment TEXT,
    metadata_commitment TEXT,
    previous_event_commitment TEXT,
    issued_at TIMESTAMPTZ NOT NULL,
    relay_received_at TIMESTAMPTZ NOT NULL,
    nonce TEXT NOT NULL,
    disclosure_policy TEXT NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL,
    relay_id TEXT NOT NULL,
    log_id TEXT NOT NULL,
    shard TEXT NOT NULL,
    log_index BIGINT NOT NULL,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(sender_trust_id, signing_key_id, nonce),
    FOREIGN KEY (log_id, log_index) REFERENCES log_entries(log_id, log_index)
);

CREATE INDEX idx_event_commitments_sender_time ON event_commitments(sender_trust_id, issued_at DESC);
CREATE INDEX idx_event_commitments_log_index ON event_commitments(log_id, log_index);

CREATE TABLE receipt_log_entries (
    receipt_commitment TEXT PRIMARY KEY CHECK (receipt_commitment ~ '^0x[0-9a-f]{64}$'),
    canonical_log_entry BYTEA NOT NULL,
    relay_id TEXT NOT NULL,
    relay_received_at TIMESTAMPTZ NOT NULL,
    log_id TEXT NOT NULL,
    shard TEXT NOT NULL,
    log_index BIGINT NOT NULL,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (log_id, log_index) REFERENCES log_entries(log_id, log_index)
);

-- Full receipts, salts, exact receiver identities, and pairwise-to-TrustID
-- binding proofs are local/private or held by an authorized provider. They
-- are not stored in the public relay/log database.

CREATE TABLE attestations (
    attestation_hash TEXT PRIMARY KEY CHECK (attestation_hash ~ '^0x[0-9a-f]{64}$'),
    issuer_trust_id TEXT NOT NULL,
    subject_trust_id TEXT NOT NULL,
    attestation_class TEXT NOT NULL,
    visibility TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ,
    claim_commitment TEXT NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE checkpoints (
    checkpoint_hash TEXT PRIMARY KEY CHECK (checkpoint_hash ~ '^0x[0-9a-f]{64}$'),
    log_id TEXT NOT NULL,
    shard TEXT NOT NULL,
    tree_size BIGINT NOT NULL,
    root_hash TEXT NOT NULL CHECK (root_hash ~ '^0x[0-9a-f]{64}$'),
    checkpoint_time TIMESTAMPTZ NOT NULL,
    previous_tree_size BIGINT NOT NULL,
    previous_checkpoint_hash TEXT NOT NULL,
    relay_id TEXT NOT NULL,
    relay_signature TEXT NOT NULL,
    settlement_backend TEXT,
    settlement_tx TEXT,
    settlement_status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    settled_at TIMESTAMPTZ,
    UNIQUE(log_id, tree_size)
);

CREATE TABLE merkle_nodes (
    log_id TEXT NOT NULL,
    shard TEXT NOT NULL,
    level INTEGER NOT NULL,
    node_index BIGINT NOT NULL,
    node_hash TEXT NOT NULL CHECK (node_hash ~ '^0x[0-9a-f]{64}$'),
    PRIMARY KEY (log_id, level, node_index)
);

CREATE TABLE provider_registry_cache (
    provider_id TEXT PRIMARY KEY,
    public_key TEXT NOT NULL,
    policy_commitment TEXT NOT NULL,
    status TEXT NOT NULL,
    latest_model_id TEXT,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE continuity_assessments (
    assessment_hash TEXT PRIMARY KEY CHECK (assessment_hash ~ '^0x[0-9a-f]{64}$'),
    target_event_commitment TEXT NOT NULL,
    subject_trust_id TEXT NOT NULL,
    issuer_provider_id TEXT NOT NULL,
    continuity_bps INTEGER NOT NULL CHECK (continuity_bps BETWEEN 0 AND 10000),
    label TEXT NOT NULL,
    model_version TEXT NOT NULL,
    evidence_commitment TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);
\end{lstlisting}

\subsection{v2 Scoring, Graph, Governance, and Agent Tables}

The v1 tables above store the baseline protocol. Implementations that claim \texttt{TSL-RC2} or higher SHOULD add typed v2 tables or equivalent JSONB stores with canonical-body retention. Raw private evidence MUST NOT be stored in these public-service tables.

\begin{lstlisting}[style=tslcode]
CREATE TABLE scoring_profiles_v2 (
    profile_id TEXT PRIMARY KEY,
    provider_id TEXT NOT NULL,
    domain TEXT NOT NULL,
    model_version TEXT NOT NULL,
    profile_hash TEXT NOT NULL CHECK (profile_hash ~ '^0x[0-9a-f]{64}$'),
    evaluation_report_commitment TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE feature_definitions_v2 (
    feature_id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL REFERENCES scoring_profiles_v2(profile_id),
    feature_name TEXT NOT NULL,
    feature_family TEXT NOT NULL,
    value_unit TEXT NOT NULL,
    normalization_rule JSONB NOT NULL,
    privacy_class TEXT NOT NULL,
    canonical_body BYTEA NOT NULL
);

CREATE TABLE domain_policies_v1 (
    policy_id TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    min_coverage_bps INTEGER NOT NULL CHECK (min_coverage_bps BETWEEN 0 AND 10000),
    threshold_policy JSONB NOT NULL,
    false_positive_cost_bps INTEGER,
    false_negative_cost_bps INTEGER,
    canonical_body BYTEA NOT NULL,
    signature TEXT
);

CREATE TABLE evidence_coverage_v1 (
    coverage_hash TEXT PRIMARY KEY CHECK (coverage_hash ~ '^0x[0-9a-f]{64}$'),
    subject_trust_id TEXT NOT NULL,
    signed_event_count BIGINT NOT NULL,
    reciprocal_receipt_count BIGINT NOT NULL,
    unique_counterparty_count BIGINT NOT NULL,
    trusted_counterparty_mass_bps INTEGER NOT NULL,
    coverage_bps INTEGER NOT NULL CHECK (coverage_bps BETWEEN 0 AND 10000),
    computed_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL
);

CREATE TABLE continuity_assessments_v2 (
    assessment_hash TEXT PRIMARY KEY CHECK (assessment_hash ~ '^0x[0-9a-f]{64}$'),
    target_event_commitment TEXT NOT NULL,
    subject_trust_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    continuity_bps INTEGER NOT NULL CHECK (continuity_bps BETWEEN 0 AND 10000),
    confidence_low_bps INTEGER NOT NULL,
    confidence_high_bps INTEGER NOT NULL,
    risk_label TEXT NOT NULL,
    evidence_coverage_hash TEXT,
    evidence_commitment TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE metadata_fingerprint_commitments_v1 (
    fingerprint_commitment TEXT PRIMARY KEY CHECK (fingerprint_commitment ~ '^0x[0-9a-f]{64}$'),
    subject_trust_id TEXT NOT NULL,
    scope_class TEXT NOT NULL,
    scope_commitment TEXT NOT NULL,
    bucket_profile TEXT NOT NULL,
    created_at_bucket TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    disclosure_policy TEXT NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE graph_feature_vectors_v1 (
    feature_vector_hash TEXT PRIMARY KEY CHECK (feature_vector_hash ~ '^0x[0-9a-f]{64}$'),
    subject_trust_id TEXT NOT NULL,
    graph_profile_id TEXT NOT NULL,
    computed_at TIMESTAMPTZ NOT NULL,
    reciprocity_bps INTEGER,
    counterparty_diversity_bps INTEGER,
    effective_counterparty_count_milli BIGINT,
    community_escape_bps INTEGER,
    trusted_neighbor_mass_bps INTEGER,
    adversarial_proximity_bps INTEGER,
    privacy_level TEXT NOT NULL,
    canonical_body BYTEA NOT NULL
);

CREATE TABLE sybil_assessments_v1 (
    sybil_assessment_hash TEXT PRIMARY KEY CHECK (sybil_assessment_hash ~ '^0x[0-9a-f]{64}$'),
    subject_trust_id TEXT NOT NULL,
    cluster_id_commitment TEXT NOT NULL,
    adversary_tier_assumed TEXT NOT NULL,
    risk_score_bps INTEGER NOT NULL,
    risk_label TEXT NOT NULL,
    computed_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE drift_reports_v1 (
    drift_report_hash TEXT PRIMARY KEY CHECK (drift_report_hash ~ '^0x[0-9a-f]{64}$'),
    subject_trust_id TEXT NOT NULL,
    drift_score_bps INTEGER NOT NULL,
    drift_label TEXT NOT NULL,
    action TEXT NOT NULL,
    computed_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE model_cards_v2 (
    model_id TEXT PRIMARY KEY,
    provider_id TEXT NOT NULL,
    model_version TEXT NOT NULL,
    model_card_hash TEXT NOT NULL CHECK (model_card_hash ~ '^0x[0-9a-f]{64}$'),
    evaluation_report_commitment TEXT NOT NULL,
    privacy_report_commitment TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE evaluation_reports_v1 (
    report_id TEXT PRIMARY KEY,
    model_id TEXT NOT NULL,
    domain TEXT NOT NULL,
    auroc_bps INTEGER,
    auprc_bps INTEGER,
    ece_bps INTEGER,
    privacy_leakage_bps INTEGER,
    promotion_gate_result TEXT NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE delegation_policies_v2 (
    policy_id TEXT PRIMARY KEY,
    principal_trust_id TEXT NOT NULL,
    delegate_trust_id TEXT NOT NULL,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    revocation_pointer TEXT NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);

CREATE TABLE agent_actions_v2 (
    action_id TEXT PRIMARY KEY,
    agent_trust_id TEXT NOT NULL,
    principal_trust_id TEXT NOT NULL,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    tool TEXT,
    parameters_commitment TEXT CHECK (parameters_commitment ~ '^0x[0-9a-f]{64}$'),
    issued_at TIMESTAMPTZ NOT NULL,
    canonical_body BYTEA NOT NULL,
    signature TEXT NOT NULL
);
\end{lstlisting}

\subsection{Local Client Store}

Raw messages, exact counterparties, salts, undisclosed metadata, and private graph features remain local.

\begin{lstlisting}[style=tslcode]
CREATE TABLE local_private_events (
    local_event_id TEXT PRIMARY KEY,
    commitment_hash TEXT NOT NULL,
    raw_message_encrypted BLOB,
    private_metadata_encrypted BLOB,
    receiver_trust_id TEXT,
    content_salt BLOB NOT NULL,
    metadata_salt BLOB,
    receiver_salt BLOB,
    created_at INTEGER NOT NULL
);

CREATE TABLE local_relationships (
    counterparty_trust_id TEXT PRIMARY KEY,
    first_seen_at INTEGER NOT NULL,
    last_seen_at INTEGER NOT NULL,
    reciprocal_receipt_count INTEGER NOT NULL DEFAULT 0,
    local_label TEXT,
    private_notes_encrypted BLOB
);

CREATE TABLE local_settings (
    key TEXT PRIMARY KEY,
    value_encrypted BLOB NOT NULL
);
\end{lstlisting}

% ============================================================
\section{Merkle Log Implementation}
% ============================================================

\subsection{Stable Shard Assignment}

For v1, the shard is the first 16 bits of SHA-256 over the UTF-8 \TrustID{}. The epoch is not part of the shard identifier and does not reset the tree.

\begin{equation}
\operatorname{shard}(\TrustID)=\operatorname{hex}_{4}(\operatorname{SHA256}(\operatorname{utf8}(\TrustID))).
\end{equation}

\subsection{RFC 9162 Merkle Tree Hash}

The log uses the RFC 9162 SHA-256 Merkle Tree Hash semantics \cite{ctv2}. For leaf input \(d\):

\begin{align}
MTH(\{d\}) &= \operatorname{SHA256}(\texttt{0x00}\parallel d),\\
MTH(D_n) &= \operatorname{SHA256}(\texttt{0x01}\parallel MTH(D[0:k])\parallel MTH(D[k:n])),
\end{align}

where \(k\) is the largest power of two smaller than \(n\), exactly as defined by RFC 9162. The empty-tree hash, inclusion proof, and consistency proof algorithms are also those of RFC 9162. Implementations MUST NOT duplicate an odd leaf, promote a node under a custom rule, add a private prefix inside the Merkle algorithm, or reset the tree at checkpoint boundaries.

TSL domain separation occurs inside the JCS-encoded \texttt{tsl.log\_entry.v1} leaf input. The RFC 9162 \texttt{0x00} and \texttt{0x01} prefixes remain unchanged.

\subsection{Inclusion Proof Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.inclusion_proof.v1",
  "log_id": "tsl-log:00af",
  "leaf_input_hash": "0x...",
  "leaf_index": 184293,
  "tree_size": 184294,
  "root_hash": "0x...",
  "audit_path": ["0x...", "0x..."],
  "checkpoint_hash": "0x..."
}
\end{lstlisting}

The verifier reconstructs the RFC 9162 Merkle Tree Hash for \texttt{leaf\_index} at \texttt{tree\_size}. Path direction is derived from the index and tree size; it is not accepted from an attacker-controlled \texttt{side} field.

\subsection{Consistency Proof Object}

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.consistency_proof.v1",
  "log_id": "tsl-log:00af",
  "old_tree_size": 147811,
  "old_root_hash": "0x...",
  "new_tree_size": 148292,
  "new_root_hash": "0x...",
  "consistency_path": ["0x...", "0x..."]
}
\end{lstlisting}

Every non-genesis checkpoint MUST be accompanied by or retrievable with a valid consistency proof from the previous advertised tree size. The checkpoint hash chain is checked as metadata, but append-only acceptance depends on RFC 9162 consistency verification.

\subsection{Checkpoint Time Rules}

A checkpoint's \texttt{checkpoint\_time} MUST be monotonic for a log, MUST be no earlier than the greatest \texttt{relay\_received\_at} among included entries, and MUST satisfy the relay clock-skew policy relative to the prior checkpoint and settlement evidence. A checkpoint time is trusted only under the verifier's relay policy and settlement assumptions.

% ============================================================
\section{Relay Node Specification}
% ============================================================

\subsection{Commitment Intake Validation}

A relay MUST perform these checks before accepting an event commitment:

\begin{enumerate}
    \item Validate the JSON Schema and reject unknown non-extension fields.
    \item Recompute RFC 8785 JCS bytes for the unsigned event.
    \item Resolve the sender and signing key.
    \item Verify the Ed25519 signature with an RFC 8032-conformant library.
    \item Check that \texttt{issued\_at} is not earlier than key creation; this is an internal-consistency check, not the key-validity gate.
    \item At the relay-controlled receive time, verify that the key exists, has become active, has not expired, and is not currently revoked under fresh registry state. Key validity at \texttt{issued\_at} alone is insufficient.
    \item If the key is already revoked, reject a new submission unless the client supplies a previously issued trusted timestamp or inclusion promise for the exact commitment with time before the effective revocation cutoff.
    \item Enforce bounded skew between \texttt{issued\_at} and the relay's current time as an intake policy; this skew check is not a substitute for trusted time evidence.
    \item Enforce replay protection with \((sender, signing\_key\_id, nonce)\).
    \item Record the relay-controlled \texttt{relay\_received\_at}.
    \item Assign the stable identity-prefix shard, persist canonical bytes, and append a typed entry to the cumulative log.
    \item Return a signed \texttt{tsl.relay\_receipt.v1} inclusion promise binding commitment, log, receive time, promised tree size, and merge deadline.
\end{enumerate}

A relay MUST NOT determine historical validity only by asking whether the key was active at the event's self-declared \texttt{issued\_at}.

For a public receipt-log submission, the relay validates only \texttt{receipt\_log\_entry.v1}, its anti-spam authorization, and replay policy. It assigns the commitment-derived privacy shard and MUST NOT request or persist the full receipt, exact receiver, event link, salt, or pairwise-to-canonical identity binding.

\subsection{Relay Response States}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} X}
\toprule
State & Meaning \\
\midrule
accepted & Relay validated the object and queued it for log append. \\
included & Object has a log index and can receive an inclusion proof. \\
checkpointed & The cumulative tree size containing the object has been checkpointed. \\
settled & Checkpoint has settlement proof from the declared backend. \\
rejected & Object failed validation. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Relay Gossip}

To avoid one relay becoming the canonical trust authority, relays SHOULD gossip closed checkpoints and signed log summaries.

\begin{lstlisting}[style=tslcode]
POST /v1/gossip/checkpoint
POST /v1/gossip/audit-finding
GET  /v1/gossip/peers
GET  /v1/gossip/checkpoints/{epoch}/{shard}
\end{lstlisting}

A receiving relay MUST verify the checkpoint signature, checkpoint hash, and settlement status before importing it.

% ============================================================
\section{API Specification}
% ============================================================

All hosted APIs are wrappers around protocol libraries. A proof that requires the hosted API to be trusted is not a valid decentralized proof.

\subsection{HTTP Conventions}

\begin{itemize}
    \item All requests and responses use \texttt{application/json} unless returning canonical bytes.
    \item Idempotent submission SHOULD use \texttt{Idempotency-Key}.
    \item API errors use a standard \texttt{error.code}, \texttt{error.message}, and optional \texttt{error.details}.
    \item Verifier endpoints MUST return enough information for the client to independently recompute verification.
\end{itemize}


\subsection{Endpoint Summary}

\begin{center}
\small
\begin{tabularx}{\textwidth}{>{\raggedright\arraybackslash}p{0.36\textwidth} p{0.12\textwidth} X}
\toprule
\textbf{Endpoint} & \textbf{Method} & \textbf{Purpose} \\
\midrule
\path|/v1/identity/create| & POST & Create and optionally register a \TrustID{}. \\
\path|/v1/identity/{trustId}| & GET & Resolve identity document and active key state. \\
\path|/v1/keys/rotate| & POST & Submit signed key rotation. \\
\path|/v1/keys/revoke| & POST & Submit signed key revocation. \\
\path|/v1/commitments| & POST & Submit event commitment. \\
\path|/v1/receipt-commitments| & POST & Submit a salted opaque receipt-log commitment; the full receipt remains local or selectively disclosed. \\
\path|/v1/attestations| & POST & Submit signed attestation. \\
\path|/v1/proofs/{commitment}| & GET & Fetch inclusion proof and checkpoint data. \\
\path|/v1/proof-bundles/{bundleId}| & GET & Fetch portable proof bundle. \\
\path|/v1/checkpoints/{shard}/{treeSize}| & GET & Fetch checkpoint. \\
\path|/v1/verify| & POST & Verify envelope, proof, key state, and optional message. \\
\path|/v1/assessments| & POST & Request optional continuity assessment. \\
\path|/v1/scoring-profiles/{profileId}| & GET & Fetch signed scoring profile. \\
\path|/v1/model-cards/{modelId}| & GET & Fetch signed model card. \\
\path|/v1/delegations/verify| & POST & Verify delegated agent action. \\
\path|/v1/audit/checkpoint| & POST & Submit signed auditor finding. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Create Identity}

\begin{lstlisting}[style=tslcode]
POST /v1/identity/create

Request:
{
  "type": "tsl.identity_create_request.v1",
  "controller_type": "local",
  "verification_method": {
    "type": "ed25519",
    "public_key": "0x..."
  },
  "recovery_policy_commitment": "0x...",
  "privacy_policy_commitment": "0x..."
}

Response:
{
  "trust_id": "did:tsl:local:0x...",
  "identity_hash": "0x...",
  "registry_status": "registered | pending | local_only",
  "registry_tx": "0x..."
}
\end{lstlisting}

\subsection{Submit Commitment}

\begin{lstlisting}[style=tslcode]
POST /v1/commitments

Request:
{
  "event": { "type": "tsl.event_commitment.v1", "...": "..." }
}

Response:
{
  "status": "accepted",
  "commitment_hash": "0x...",
  "relay_id": "did:tsl:relay:001",
  "log_id": "tsl-log:00af",
  "shard": "00af",
  "relay_receipt": {
    "type": "tsl.relay_receipt.v1",
    "relay_received_at": "2026-05-25T00:01:04Z",
    "promised_tree_size": 184294,
    "merge_by": "2026-05-25T00:06:04Z",
    "signature": "0xrelaySignedPromise"
  }
}
\end{lstlisting}

\subsection{Verify}

\begin{lstlisting}[style=tslcode]
POST /v1/verify

Request:
{
  "envelope": { "type": "tsl.event_commitment.v1", "...": "..." },
  "relay_receipt": { "type": "tsl.relay_receipt.v1", "...": "..." },
  "proof": { "type": "tsl.inclusion_proof.v1", "...": "..." },
  "checkpoint": { "type": "tsl.batch_checkpoint.v1", "...": "..." },
  "message_disclosure": {
    "raw_message": "optional",
    "content_salt": "optional"
  },
  "verifier_policy": {
    "require_settlement": true,
    "max_clock_skew_ms": 600000,
    "require_trusted_time_binding": true,
    "accepted_scoring_providers": ["did:tsl:provider:continuity-labs"]
  }
}

Response:
{
  "verified": true,
  "checks": {
    "schema_valid": true,
    "signature_valid": true,
    "key_active": true,
    "not_revoked": true,
    "content_commitment_matches": true,
    "included_in_log": true,
    "checkpoint_valid": true,
    "checkpoint_settled": true
  },
  "commitment_hash": "0x...",
  "continuity_label": "not_assessed",
  "explanation": ["Signature valid", "Key active", "Included in settled checkpoint"]
}
\end{lstlisting}



\subsection{Canonical Error-Code Registry}

Every API and verifier library MUST return canonical machine-readable error codes. User-facing copy MAY be localized, but the code, source layer, fatality, and retryability semantics MUST remain stable.

\tiny
\begin{longtable}{>{\raggedright\arraybackslash\bfseries}p{0.42\textwidth} >{\raggedright\arraybackslash}p{0.08\textwidth} >{\raggedright\arraybackslash}p{0.06\textwidth} >{\raggedright\arraybackslash}p{0.06\textwidth} >{\raggedright\arraybackslash}p{0.27\textwidth}}
\toprule
Code & Layer & Fatal & Retry & User-Facing Meaning \\
\midrule
TSL\_SCHEMA\_INVALID & schema & yes & no & The proof object is malformed or unsupported. \\
TSL\_CANONICALIZATION\_FAILED & schema & yes & no & The object cannot be serialized deterministically. \\
TSL\_UNSUPPORTED\_OBJECT\_VERSION & schema & yes & no & This verifier does not support the object version. \\
TSL\_UNKNOWN\_REQUIRED\_FIELD & schema & yes & no & A required field is unknown or outside an extension namespace. \\
TSL\_SIGNATURE\_INVALID & crypto & yes & no & The signature does not match the claimed key. \\
TSL\_KEY\_NOT\_FOUND & identity & yes & maybe & The signing key is not registered for this identity. \\
TSL\_KEY\_EXPIRED & identity & yes & no & The signing key had expired at the relevant time. \\
TSL\_KEY\_REVOKED & identity & yes & no & The key was revoked before the relevant event time. \\
TSL\_REVOCATION\_STATE\_STALE & identity & no & yes & Revocation state is too old for the verifier policy. \\
TSL\_NONCE\_REPLAY & relay & yes & no & This sender/key/nonce was already accepted. \\
TSL\_ISSUED\_AT\_OUT\_OF\_WINDOW & relay & yes & yes & The self-declared issued time is outside relay intake policy; this check is not trusted time evidence. \\
TSL\_TIME\_BINDING\_MISSING & relay & yes & maybe & No trusted relay receipt, prior inclusion promise, or checkpoint time binds the event before the revocation cutoff. \\
TSL\_RELAY\_RECEIPT\_INVALID & relay & yes & no & The relay receipt signature, commitment, time, or merge promise is invalid. \\
TSL\_POST\_REVOCATION\_SUBMISSION & identity & yes & no & The event was first presented after revocation without trusted pre-revocation evidence. \\
TSL\_INCLUSION\_INVALID & log & yes & no & The Merkle proof does not match the checkpoint root. \\
TSL\_CHECKPOINT\_INVALID & settlement & yes & no & The checkpoint signature or hash is invalid. \\
TSL\_CHECKPOINT\_CONFLICT & settlement & yes & no & Conflicting roots exist for the same log and tree size. \\
TSL\_SETTLEMENT\_MISSING & settlement & policy & yes & Settlement is missing but required by policy. \\
TSL\_PROOF\_BUNDLE\_REDACTED & privacy & no & no & Some private fields were intentionally redacted. \\
TSL\_DISCLOSURE\_CONSENT\_REQUIRED & privacy & policy & no & More disclosure requires explicit consent. \\
TSL\_INSUFFICIENT\_EVIDENCE & scoring & no & yes & The scorer abstained because evidence coverage is too low. \\
TSL\_PROVIDER\_INACTIVE & scoring & policy & maybe & The scoring provider is not active under verifier policy. \\
TSL\_MODEL\_NOT\_REGISTERED & scoring & policy & maybe & The referenced model version is not registered. \\
TSL\_MODEL\_EXPIRED & scoring & no & yes & The assessment expired and should be refreshed. \\
TSL\_ASSESSMENT\_SIGNATURE\_INVALID & scoring & yes & no & The assessment signature is invalid. \\
TSL\_NEGATIVE\_CLAIM\_APPEALED & attestation & no & no & A negative claim exists but has active appeal context. \\
TSL\_DELEGATION\_MISSING & agent & yes & yes & No valid principal authorization was provided. \\
TSL\_DELEGATION\_EXPIRED & agent & yes & no & The action occurred outside delegated time. \\
TSL\_DELEGATION\_REVOKED & agent & yes & no & The principal revoked the delegation before action. \\
TSL\_DELEGATION\_SCOPE\_VIOLATION & agent & yes & no & The action is outside delegated scope. \\
TSL\_DELEGATION\_CONSTRAINT\_VIOLATION & agent & yes & no & Amount, tool, counterparty, rate, or approval constraints failed. \\
\bottomrule
\end{longtable}
\normalsize

For the \texttt{Fatal} column, \texttt{policy} means the verifier policy decides whether the failure blocks the action or only displays a warning.


% ============================================================
\section{Verifier Implementation}
% ============================================================

\subsection{Pure Verification Algorithm}

The verifier MUST be implementable as a pure library with no trusted network call. Network calls can fetch missing state, but fetched data must be independently verified.

\subsubsection{Settlement Evidence Policy}

\TSL{} supports two settlement evidence kinds:

\begin{description}
    \item[\texttt{rpc\_attested\_receipt}] An operational or release-candidate evidence object derived from one or more RPC providers. It MUST remain labeled as RPC-attested evidence and MUST NOT be represented as a full offline cryptographic proof.
    \item[\texttt{offline\_receipt\_log\_proof}] A mainnet-grade evidence object that can be verified from bundle-carried data without trusted live network calls.
\end{description}

When verifier policy requires mainnet-grade settlement, the verifier MUST require \texttt{offline\_receipt\_log\_proof} or a separately approved finality-oracle evidence type. The offline proof MUST bind:

\begin{itemize}
    \item chain ID;
    \item contract address;
    \item transaction hash;
    \item block hash and block number;
    \item canonical block header or approved header commitment;
    \item receipt root;
    \item transaction index;
    \item receipt RLP or canonical receipt encoding;
    \item receipt trie proof nodes;
    \item receipt status;
    \item emitted checkpoint event topic/hash;
    \item emitted checkpoint event fields;
    \item log index;
    \item checkpoint identity hash;
    \item contract checkpoint fields hash;
    \item submitter;
    \item finality or source proof.
\end{itemize}

For Base mainnet, the production target is chain ID \texttt{8453}. The checkpoint registry, revocation registry, TrustID registry, provider registry, and governance registry addresses MUST be recorded as deployment evidence before \texttt{TSL-MAINNET}. A Base receipt/log proof MUST be bound to an accepted finality source, such as an L1-finalized source commitment or another approved finality mechanism. Until this proof path is implemented and vector-tested, RPC-attested receipts MAY be used only for RC or testnet evidence.

\subsubsection{RPC-Attested Receipt Policy}

When \texttt{rpc\_attested\_receipt} is allowed by verifier policy, it SHOULD include at least two independent RPC responses when practical. The evidence MUST bind provider/source commitment, chain ID, block hash, transaction hash, receipt status, contract address, event topic, checkpoint identity hash, and contract field hash. Mismatched RPC responses MUST be rejected or surfaced as settlement ambiguity. RPC-attested evidence is not sufficient by itself for \texttt{TSL-MAINNET}.

\subsubsection{Algorithm Pseudocode}

\begin{lstlisting}[style=tslcode]
function verifyTSL(input, policy): VerificationResult {
  result = new VerificationResult()

  result.schema_valid = validateSchema(input.envelope)
  if !result.schema_valid: return result.fail("TSL_SCHEMA_INVALID")

  canonical = RFC8785_JCS(removeSignature(input.envelope))
  event_hash = hashDomain("tsl.event_commitment.v1", canonical)

  identity = resolveTrustID(input.envelope.sender)
  key = identity.getKey(input.envelope.signing_key_id)
  result.key_found = key != null
  result.issued_at_consistent_with_key_lifecycle = keyCreatedNoLaterThan(key, input.envelope.issued_at)
  result.signature_valid = verifyEd25519RFC8032(key.public_key, event_hash, input.envelope.signature)

  result.commitment_hash = hashDomain("tsl.event.submission.v1", event_hash || input.envelope.signature)
  result.relay_receipt_valid = verifyRelayReceipt(input.relay_receipt, result.commitment_hash, policy)
  result.key_active_at_trusted_time = result.relay_receipt_valid &&
      keyActiveAt(key, input.relay_receipt.relay_received_at)
  result.included_in_log = verifyRFC9162Inclusion(input.proof, input.checkpoint)
  result.checkpoint_valid = verifyCheckpoint(input.checkpoint)
  result.consistency_context_valid = verifyRequiredRFC9162Consistency(input.consistency_context, input.checkpoint, policy)
  result.checkpoint_settled = verifySettlement(input.checkpoint, policy)

  revocation = resolveRevocationState(key)
  result.trusted_time_binding_valid = verifyThreeTimeBinding({
    issued_at: input.envelope.issued_at,
    relay_received_at: input.relay_receipt.relay_received_at,
    checkpoint_time: input.checkpoint.checkpoint_time,
    revocation_effective_at: revocation.effective_at,
    prior_trusted_evidence: input.prior_trusted_time_evidence,
    policy
  })
  result.not_revoked_for_event = result.trusted_time_binding_valid &&
      eventValidUnderRevocationPolicy(revocation, input)

  if input.message_disclosure exists:
    result.content_commitment_matches = verifyContentCommitment(
      input.message_disclosure.raw_message,
      input.message_disclosure.content_salt,
      input.envelope.content_commitment
    )

  return result.finalize(policy)
}
\end{lstlisting}

\subsection{Verification Result Semantics}

A result can be cryptographically valid but not trusted. The implementation MUST separate these states:

\begin{center}
\small
\begin{tabularx}{\textwidth}{>{\raggedright\arraybackslash}p{0.30\textwidth} X}
\toprule
\textbf{Field} & \textbf{Meaning} \\
\midrule
\path|cryptographic_validity| & Schema, RFC 8785 canonicalization, RFC 8032 signature, key activity at trusted first observation, three-time binding, revocation, RFC 9162 inclusion/consistency context, and checkpoint checks. \\
\path|content_match| & Raw disclosed content matches the commitment. Optional when content is undisclosed. \\
\path|settlement_status| & Whether checkpoint is settled, pending, or unavailable. \\
\path|risk_assessment| & Optional signed domain-specific continuity or risk assessment. Not required for protocol validity. \\
\path|verdict| & Human-facing summary generated from policy and checks. \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Smart Contract Implementation}
% ============================================================

Contracts settle registry facts and checkpoint roots. They do not compute continuity or risk assessments and do not store raw messages.

\subsection{Checkpoint Registry Storage}

\begin{lstlisting}[style=tslcode]
struct Checkpoint {
    bytes32 logId;
    bytes32 shard;
    uint64 treeSize;
    bytes32 rootHash;
    uint64 checkpointTime;
    uint64 previousTreeSize;
    bytes32 previousCheckpointHash;
    bytes32 relayId;
    uint64 submittedAt;
}

mapping(bytes32 => Checkpoint) public checkpointsByHash;
mapping(bytes32 => bytes32) public checkpointHashByLogAndSize;
\end{lstlisting}

The lookup key is:

\begin{equation}
K = \hash(logId \parallel \operatorname{uint64be}(treeSize)).
\end{equation}

\subsection{Checkpoint Submission}

\begin{lstlisting}[style=tslcode]
function submitCheckpoint(CheckpointInput calldata input, bytes calldata relaySignature) external {
    require(isAuthorizedRelay(input.relayId), "UNAUTHORIZED_RELAY");

    bytes32 key = keccak256(abi.encodePacked(input.logId, input.treeSize));
    require(checkpointHashByLogAndSize[key] == bytes32(0), "CHECKPOINT_EXISTS");
    require(input.previousTreeSize <= input.treeSize, "TREE_SIZE_REGRESSION");

    bytes32 checkpointHash = hashCheckpoint(input);
    require(verifyRelaySignature(input.relayId, checkpointHash, relaySignature), "BAD_RELAY_SIG");

    checkpointsByHash[checkpointHash] = Checkpoint({
        logId: input.logId,
        shard: input.shard,
        treeSize: input.treeSize,
        rootHash: input.rootHash,
        checkpointTime: input.checkpointTime,
        previousTreeSize: input.previousTreeSize,
        previousCheckpointHash: input.previousCheckpointHash,
        relayId: input.relayId,
        submittedAt: uint64(block.timestamp)
    });

    checkpointHashByLogAndSize[key] = checkpointHash;
    emit CheckpointSubmitted(checkpointHash, input.logId, input.treeSize, input.rootHash);
}
\end{lstlisting}

The contract prevents duplicate claims for one log and tree size, but it does not itself verify RFC 9162 consistency. Auditors and verifiers MUST verify the off-chain consistency proof between advertised sizes; a contract hash chain alone is insufficient.

\subsection{Token-Free Core}

Core contracts MUST NOT require a native token. Fee policy, staking, rewards, and governance may be added through separate modules.

\begin{lstlisting}[style=tslcode]
interface IFeePolicy {
    function authorizeAction(address actor, bytes32 actionType, bytes32 actionId) external returns (bool);
}

interface IRelayStakingPolicy {
    function isAuthorizedRelay(bytes32 relayId) external view returns (bool);
}
\end{lstlisting}

The default MVP policy MAY be an allowlist or multisig-controlled relay registry. A later token-based policy can replace it without changing event commitments, receipts, Merkle proofs, or verification rules.

% ============================================================
\section{Identity Resolution and Revocation}
% ============================================================

\subsection{Resolution Algorithm}

Identity resolution returns key lifecycle facts and revocation records, but event validity is decided with trusted event-time evidence rather than a self-declared timestamp alone.

\begin{lstlisting}[style=tslcode]
function resolveTrustID(trustId): ResolvedIdentity {
  method = parseMethod(trustId)
  doc = methodResolver(method).resolve(trustId)
  registryState = settlementBackend.getIdentityState(trustId)
  revocations = settlementBackend.getRevocations(trustId)
  return { trust_id: trustId, document: doc, registry_state: registryState, revocations }
}
\end{lstlisting}

\subsection{Three-Time Revocation Rule}

For event \(e\), let \(t_i\) be signed \texttt{issued\_at}, \(t_r\) be a verified relay receive time or equivalent trusted timestamp, \(t_c\) be the including checkpoint time, and \(t_v\) be the key's effective revocation cutoff.

\begin{enumerate}
    \item \(t_i\) orders signer intent but is not trusted proof of existence.
    \item Ordinary validity requires \(t_i\leq t_r\leq t_c\), subject to bounded skew and monotonic checkpoint rules, and the signing key MUST be active at the trusted first-observation time \(t_r\) (or at the time carried by an equivalent trusted timestamp). Checking activity only at \(t_i\) is forbidden.
    \item If \(t_r<t_v\), the event MAY remain historically valid even if checkpoint settlement occurs after \(t_v\), provided the pre-revocation relay receipt or inclusion promise is valid and later merged as promised.
    \item If the event is first presented at or after \(t_v\), it MUST fail unless the submission carries a previously issued trusted timestamp, relay receipt, or inclusion promise for the exact commitment with time before \(t_v\).
    \item A backdated \texttt{issued\_at} without trusted pre-revocation evidence MUST fail with \texttt{TSL\_POST\_REVOCATION\_SUBMISSION}.
    \item A retroactive compromise warning MAY lower confidence or trigger review for earlier events, but MUST NOT rewrite trusted log history or silently invalidate events already timestamped before the cutoff.
\end{enumerate}

\subsection{Revocation Publication Time}

The revocation object has signer-declared \texttt{issued\_at} and \texttt{effective\_at}; the relay receipt and checkpoint for the revocation establish trusted publication time. Verifiers MUST retain both event and revocation time evidence so that disputes can be reproduced.

% ============================================================
\section{Scoring Provider Implementation}
% ============================================================

Scoring is optional, signed, domain-specific, and target-action-specific. It MUST NOT be required for protocol verification.

\subsection{Open-Source Feature Extraction Contract}

\begin{lstlisting}[style=tslcode]
export interface OpenSourceContinuityFeatureExtractor {
  extract(input: {
    targetRelease: VerifiedEventSummary;
    priorVerifiedReleases: VerifiedEventSummary[];
    keyLineage: VerifiedKeyTransition[];
    controlEvidence: VerifiedRepositoryOrRegistryControl[];
    disclosedReviewEvidence: VerifiedReceiptSummary[];
    attestations: VerifiedAttestationSummary[];
    revocationState: RevocationSummary;
    localContext?: LocalVerifierContext;
  }): Promise<OpenSourceContinuityFeatureVectorV0>;
}

export interface OpenSourceContinuityFeatureVectorV0 {
  type: "tsl.opensource_continuity_feature_vector.v0";
  target_event_commitment: Hex32;
  computed_at: RFC3339;
  maintainer_key_lineage_bps: number;
  signed_release_history_bps: number;
  reviewer_or_co_maintainer_evidence_bps: number;
  repository_registry_control_continuity_bps: number;
  counterparty_community_diversity_bps: number;
  maintainer_attestation_quality_bps: number;
  release_cadence_consistency_bps: number;
  change_set_dependency_continuity_bps: number;
  local_verifier_policy_bps?: number;
  has_adverse_evidence: boolean;
}
\end{lstlisting}

\subsection{Hard Gate Before Evidence Weighting}

\begin{lstlisting}[style=tslcode]
if !schema_valid || !canonicalization_valid || !signature_valid ||
   !key_active_at_trusted_time || !trusted_time_binding_valid ||
   !not_revoked_for_event || !included_in_log || !checkpoint_valid:
    return signed_protocol_failure_without_continuity_bps()
\end{lstlisting}

No cryptographic-validity field appears in the weighted feature vector. The transparent v0 weights sum to 10,000 basis points only over domain evidence after the hard gate. The signed output MUST identify the target release, policy, profile, continuity basis points, uncertainty, coverage, expiry, and provider signature.

% ============================================================
\section{Security, Abuse Controls, and Rate Limits}
% ============================================================

\subsection{Replay Protection}

Relays MUST reject duplicate \((sender, signing\_key\_id, nonce)\). Clients MUST generate a new 256-bit random nonce for every event.

\subsection{Rate Limits}

Recommended MVP limits:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.28\textwidth} X}
\toprule
Actor / Action & Default Limit \\
\midrule
New identity event submissions & 100 per hour until identity has settled checkpoint history. \\
Established identity submissions & 10,000 per hour, adjustable by relay policy. \\
Negative public attestations & 10 per day per issuer, stricter for low-continuity issuers. \\
Proof requests & 1,000 per hour per IP or API key for hosted API; unlimited for local verification. \\
Checkpoint submissions & One monotonic checkpoint per relay, log, and advertised tree size. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Negative Attestation Controls}

A public negative attestation MUST include:

\begin{itemize}
    \item issuer identity,
    \item subject identity,
    \item claim class,
    \item evidence commitment,
    \item expiration,
    \item appeal pointer or policy pointer,
    \item issuer signature.
\end{itemize}

The protocol SHOULD distinguish \texttt{private\_warning}, \texttt{provider\_risk\_flag}, and \texttt{public\_negative\_claim}.

\subsection{Privacy Requirements}

\begin{enumerate}
    \item Exact receiver identities MUST be absent from public or generally retrievable receipt logs; pairwise identifiers are selective and scope-bound.
    \item Content commitments MUST use salts unless the content is intentionally public.
    \item Metadata commitments MUST use salts.
    \item Public logs MUST NOT include raw platform identifiers by default.
    \item Clients MUST warn users before disclosing raw messages or exact counterparties.
\end{enumerate}

% ============================================================
\section{Deployment Specification}
% ============================================================

\subsection{Docker Compose MVP}

\begin{lstlisting}[style=tslcode]
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: tsl
      POSTGRES_USER: tsl
      POSTGRES_PASSWORD: tsl_dev_only
    ports: ["5432:5432"]

  redis:
    image: redis:7
    ports: ["6379:6379"]

  relay-node:
    build: ./services/relay-node
    environment:
      DATABASE_URL: postgres://tsl:tsl_dev_only@postgres:5432/tsl
      QUEUE_URL: redis://redis:6379
      TSL_RELAY_ID: did:tsl:relay:dev
      TSL_EPOCH_MS: 300000
    ports: ["8080:8080"]

  log-node:
    build: ./services/log-node
    environment:
      DATABASE_URL: postgres://tsl:tsl_dev_only@postgres:5432/tsl
      QUEUE_URL: redis://redis:6379
    ports: ["8081:8081"]

  resolver-node:
    build: ./services/resolver-node
    environment:
      DATABASE_URL: postgres://tsl:tsl_dev_only@postgres:5432/tsl
      SETTLEMENT_RPC_URL: http://anvil:8545
    ports: ["8082:8082"]

  verifier-api:
    build: ./services/verifier-api
    ports: ["8083:8083"]

  anvil:
    image: ghcr.io/foundry-rs/foundry:latest
    command: anvil --host 0.0.0.0
    ports: ["8545:8545"]
\end{lstlisting}

\subsection{Production Topology}

A production deployment SHOULD use at least:

\begin{itemize}
    \item three relay nodes across independent regions,
    \item three log nodes with replicated storage,
    \item one checkpoint submitter per settlement backend,
    \item at least two auditor nodes run by independent operators,
    \item read-only verifier replicas,
    \item offline signing keys or HSM-backed keys for relay checkpoint signatures,
    \item immutable object storage for closed log segments.
\end{itemize}

\subsection{Environment Variables}

\begin{lstlisting}[style=tslcode]
TSL_NODE_ROLE=relay|log|resolver|verifier|auditor|checkpoint_submitter
TSL_NETWORK=devnet|testnet|mainnet
TSL_RELAY_ID=did:tsl:relay:...
TSL_RELAY_PRIVATE_KEY_URI=env|file|kms|hsm
TSL_DATABASE_URL=postgres://...
TSL_QUEUE_URL=nats://...|redis://...|kafka://...
TSL_EPOCH_MS=300000
TSL_SHARD_PREFIX_BITS=16
TSL_SETTLEMENT_BACKEND=eip155:8453
TSL_SETTLEMENT_RPC_URL=https://...
TSL_REQUIRE_SETTLEMENT=true
TSL_LOG_SEGMENT_BUCKET=s3://...
\end{lstlisting}

% ============================================================
\section{Test Vectors and Compliance}
% ============================================================

A compliant implementation MUST pass the published RFC vectors and TSL profile vectors. TSL does not replace standard primitive vectors with home-grown examples.

\subsection{RFC 8785 JCS Vectors}

Implementations MUST pass the RFC 8785 property-order and number-serialization vectors, including published errata. The simple pair below also canonicalizes to identical UTF-8 bytes:

\begin{lstlisting}[style=tslcode]
{"b":2,"a":1}
{"a":1,"b":2}
expected JCS bytes: {"a":1,"b":2}
\end{lstlisting}

Cross-language tests MUST include non-ASCII property names whose RFC 8785 UTF-16 sorting order differs from naive locale or UTF-8-byte sorting.

\subsection{RFC 8032 Ed25519 Vectors}

All Ed25519 implementations MUST pass RFC 8032 Section 7.1. At minimum, the first vector is included verbatim in the repository manifest:

\begin{lstlisting}[style=tslcode]
secret_key:
9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60
public_key:
d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a
message: <empty>
signature:
e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e06522490155
5fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b
\end{lstlisting}

Production code MUST use an audited library and reject malformed points, wrong lengths, out-of-range scalar values, and altered messages according to the library's RFC 8032 behavior.

\subsection{RFC 9162 Merkle Vectors}

The repository MUST include inclusion and consistency vectors generated from the RFC 9162 Merkle Tree Hash algorithm for tree sizes 0 through at least 16. Every language implementation MUST reproduce identical roots, inclusion paths, and consistency paths. A custom odd-node rule is a conformance failure.

\subsection{Critical TSL Security Vectors}

\begin{longtable}{>{\bfseries}p{0.31\textwidth} p{0.57\textwidth}}
\toprule
Vector & Required Result \\
\midrule
Backdated event after revocation & An event signed after cutoff with earlier \texttt{issued\_at} and no trusted pre-revocation evidence fails with \texttt{TSL\_POST\_REVOCATION\_SUBMISSION}. \\
Pre-revocation inclusion promise, later merge & Event remains historically valid when exact commitment has valid pre-cutoff relay receipt or inclusion promise and is merged by deadline. \\
Relay receipt tamper & Changing commitment, receive time, log ID, tree-size promise, or signature fails. \\
Checkpoint time regression & A checkpoint earlier than the prior checkpoint or an included relay time fails. \\
RFC 9162 inconsistency & A newer root that is not an append-only extension fails even if \texttt{previous\_checkpoint\_hash} is syntactically correct. \\
Receipt graph privacy & Public receipt log entry contains no exact TrustID, event link, stable global receiver ID, receipt class, or unsalted receipt hash. \\
Selective receipt disclosure & Authorized verifier can open the salted commitment and verify pairwise signature and optional identity-binding proof. \\
Cryptographic gate & Invalid signature, failed time binding, or revoked key produces no ordinary \texttt{continuity\_bps}. \\
Recursive neighbor convergence & Governed iteration converges within one basis point or returns the non-convergence error; no provider fallback value is accepted. \\
Seed sensitivity & Required seed-removal and damping perturbations produce a signed sensitivity report and trigger abstention when label stability fails. \\
\bottomrule
\end{longtable}

\subsection{Compliance Matrix}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.30\textwidth} X}
\toprule
Requirement & Test \\
\midrule
RFC 8785 JCS & Reordered objects and official edge vectors produce identical canonical bytes. \\
RFC 8032 Ed25519 & Official valid vectors pass; altered message/signature and malformed encodings fail. \\
Replay protection & Duplicate sender/key/nonce is rejected. \\
Revocation backdating & Self-declared historical time does not bypass current revocation state. \\
Receipt privacy & Public log and public database expose only opaque salted commitment. \\
RFC 9162 append-only log & Inclusion and consistency proofs verify at cumulative tree sizes; independent epoch reset is rejected. \\
Hard gate & Protocol failure suppresses continuity assessment value. \\
Domain scope & Initial assessment object names target release, domain, policy, model, evidence window, and expiry. \\
Token independence & Core verification passes without token or fee policy. \\
\bottomrule
\end{tabularx}
\end{center}

% ============================================================
\section{Implementation Milestones}
% ============================================================

\subsection{Milestone 1: Core Protocol Library}

Deliverables:

\begin{itemize}
    \item JSON Schemas for all v1 objects.
    \item Canonicalization library.
    \item Hash and signature utilities.
    \item \TrustID{} generation and resolution abstraction.
    \item Event, receipt, attestation, and revocation builders.
    \item Verification library with test vectors.
\end{itemize}

Acceptance criteria:

\begin{itemize}
    \item Unit tests pass across TypeScript and Rust.
    \item RFC 8785, RFC 8032, RFC 9162, and TSL attack vectors are identical across languages.
    \item Invalid signatures, revoked keys, and tampered commitments fail deterministically.
\end{itemize}

\subsection{Milestone 2: Relay and Log Node}

Deliverables:

\begin{itemize}
    \item Commitment intake API.
    \item Validation pipeline.
    \item Durable queue.
    \item Cumulative identity-prefix RFC 9162 log.
    \item RFC 9162 inclusion and consistency proof generation.
    \item Checkpoint builder.
\end{itemize}

Acceptance criteria:

\begin{itemize}
    \item 1 million test commitments can be appended to cumulative shards and proven on a development cluster.
    \item Inclusion proof verification succeeds from an offline verifier.
    \item Duplicate nonce replay is rejected.
\end{itemize}

\subsection{Milestone 3: Settlement Contracts}

Deliverables:

\begin{itemize}
    \item TrustID registry.
    \item Revocation registry.
    \item Checkpoint registry.
    \item Provider registry.
    \item Foundry or Hardhat tests.
\end{itemize}

Acceptance criteria:

\begin{itemize}
    \item Checkpoints can be submitted and queried.
    \item Conflicting checkpoints are detected, and non-consistent cumulative roots are rejected by verifiers/auditors.
    \item Revoked keys fail verifier tests.
    \item No token contract is required for core verification.
\end{itemize}

\subsection{Milestone 4: Verifier and Proof Link}

Deliverables:

\begin{itemize}
    \item CLI verifier.
    \item Web reference verifier.
    \item Proof link format.
    \item Browser extension proof detection.
\end{itemize}

Acceptance criteria:

\begin{itemize}
    \item A proof generated by one client verifies in another client.
    \item Verification works if hosted API is offline but proof data is available.
    \item Disclosed message content matches content commitment.
\end{itemize}

\subsection{Milestone 5: Optional Continuity Assessment Provider}

Deliverables:

\begin{itemize}
    \item Reference feature extractor.
    \item Transparent open-source release-continuity model with hard protocol gates.
    \item Signed continuity assessment object.
    \item Explanation generator.
\end{itemize}

Acceptance criteria:

\begin{itemize}
    \item Assessment output is target-bound, signed, and expires.
    \item Verifier can display a domain-specific assessment but does not require it for protocol validity.
    \item User can choose not to request an assessment.
\end{itemize}

% ============================================================
\section{Token Compatibility Without Token Dependency}
% ============================================================

\TSL{} is token-compatible but not token-dependent. The core protocol MUST work without a native token. A future token MAY coordinate relay staking, auditor rewards, provider bonds, proof-generation fees, grants, and governance. Token ownership MUST NOT be interpreted as trustworthiness.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.28\textwidth} X}
\toprule
Layer & Token Relationship \\
\midrule
Core trust layer & No token dependency. Events, receipts, revocations, proofs, and verification remain valid without token logic. \\
Settlement layer & May use existing chain gas or sponsored submission. \\
Economic layer & May later add fiat, credits, stablecoins, or native token fees. \\
Governance layer & May later add token voting, but protocol safety should retain security-council emergency controls. \\
\bottomrule
\end{tabularx}
\end{center}

A future token module must be added as a separate adapter:

\begin{lstlisting}[style=tslcode]
export interface EconomicsAdapter {
  quote(action: MeteredAction): Promise<Quote>;
  authorize(actor: TrustID, action: MeteredAction, quote: Quote): Promise<Authorization>;
  settle(authorization: Authorization): Promise<UsageReceipt>;
}
\end{lstlisting}

The verifier MUST NOT check token balances when determining cryptographic validity.


% ============================================================
\section{The Founder Narrative}
% ============================================================

The long-term vision should be clearly separated from the first scientific claim:

\begin{quote}
The internet used to trust accounts. Then it trusted platforms. Now AI can fake both the content and the account layer. One potentially costly-to-fake signal is a long-running, cryptographically signed, time-bound, and independently witnessed trajectory. The first paper tests this only for open-source releases.
\end{quote}

\begin{quote}
\TSL{} is building a continuity-evidence protocol. Its first validated profile is intended for open-source maintainer and release continuity; broader domains remain a roadmap.
\end{quote}

\begin{quote}
Applications can carry portable evidence without owning the assessment.
\end{quote}

% ============================================================
\section{Appendix A: Formal Cryptographic Sketch}
% ============================================================

Let \(m\) be raw content, \(\mu\) private metadata, \(r\) the receiver identity, \(n\) a nonce, and \(t_i\) the signer-declared \texttt{issued\_at}. Let \(JCS\) be RFC 8785 canonicalization.

\begin{align}
    c_m &= \hash(\texttt{content-domain}\parallel JCS(m) \parallel s_m), \\
    c_\mu &= \hash(\texttt{metadata-domain}\parallel JCS(\mu) \parallel s_\mu), \\
    c_r &= \hash(\texttt{receiver-domain}\parallel JCS(r) \parallel s_r).
\end{align}

The unsigned event object is:

\begin{equation}
    e=(\mathrm{sid}_s,key_id,c_r,c_m,c_\mu,h_{prev},t_i,n,\rho).
\end{equation}

Its canonical bytes and signed hash are:

\begin{align}
    b_e &= JCS(e),\\
    h_e &= \hash_{\texttt{tsl.event\_commitment.v1}}(b_e),\\
    \sigma_e &= \sign_{sk_s}(h_e),\\
    C_e &= \hash_{\texttt{tsl.event.submission.v1}}(h_e\parallel\sigma_e).
\end{align}

A trusted relay signs \(R_e=(C_e,log\_id,t_r,promised\_size,merge\_by)\), where \(t_r\) is \texttt{relay\_received\_at}. The cumulative log appends a typed JCS leaf input \(d_e\), and RFC 9162 computes the tree root \(root_n=MTH(D_n)\). A checkpoint signs \(Q_n=(log\_id,n,root_n,t_c,previous\_size,previous\_checkpoint)\), where \(t_c\) is \texttt{checkpoint\_time}.

For revocation cutoff \(t_v\), ordinary event validity is:

\begin{align}
V={}&\operatorname{VerifyEd25519}(pk_s,h_e,\sigma_e)\\
&\land \operatorname{VerifyRelayReceipt}(R_e,C_e)\\
&\land \operatorname{KeyActiveAtTrustedTime}(pk_s,t_r)\\
&\land (t_i\leq t_r\leq t_c)\\
&\land \left(t_r<t_v\;\lor\;\operatorname{TrustedPreRevocationEvidence}(C_e,t_v)\right)\\
&\land \operatorname{VerifyRFC9162Inclusion}(d_e,n,root_n,\pi_e)\\
&\land \operatorname{VerifyRequiredConsistency}(root_m,m,root_n,n,\kappa_{m,n})\\
&\land \operatorname{VerifyCheckpoint}(Q_n)\\
&\land \operatorname{SettlementPolicySatisfied}(Q_n).
\end{align}

The self-declared \(t_i\) is never sufficient to satisfy the pre-revocation condition. A first-seen submission with \(t_r\geq t_v\) fails unless the exact commitment already has independently verifiable pre-revocation time evidence.

% ============================================================
\section{Appendix B: Standards Alignment}
% ============================================================

\TSL{} should align with existing standards where useful without depending on any one standard as a bottleneck.

\begin{itemize}
    \item \textbf{DIDs:} \TrustID{} resolution can map to DID documents, verification methods, and service endpoints. See W3C DID Core \cite{didcore}.
    \item \textbf{Verifiable Credentials:} Continuity assessments, organization membership, and professional attestations can be represented as verifiable credentials. See W3C VC Data Model 2.0 \cite{vc2}.
    \item \textbf{Account abstraction:} Smart accounts can support recovery, delegated signing, paymasters, and scoped agent keys. See ERC-4337 \cite{erc4337}.
    \item \textbf{Canonical JSON:} Signed JSON objects use RFC 8785 JCS exactly. See \cite{jcs}.
    \item \textbf{Ed25519:} Signature implementations and primitive vectors follow RFC 8032. See \cite{eddsa}.
    \item \textbf{Transparency logs:} Cumulative Merkle Tree Hash, inclusion proofs, and consistency proofs follow RFC 9162 semantics. See \cite{ctv2}.
    \item \textbf{Layer-2 settlement:} High-volume commitments should be batched and settled through L2s or app-rollups rather than written one-by-one to L1. See Ethereum scaling documentation \cite{ethscaling}.
\end{itemize}

% ============================================================
\section{Appendix C: Default Product Copy}
% ============================================================

\subsection{Website Hero}

\begin{quote}
\textbf{Proof of Continuity for the AI Internet.}\\
TSL carries portable proofs of origin, key continuity, revocation state, and log inclusion. Its first assessment profile evaluates a specific open-source release under a declared maintainer-continuity policy.
\end{quote}

\subsection{Investor One-Liner}

\begin{quote}
We are building a portable continuity-evidence protocol, beginning with verifiable maintainer keys and open-source release histories.
\end{quote}

\subsection{Developer One-Liner}

\begin{quote}
Add \texttt{tsl.verify()} to a release workflow to check JCS bytes, signatures, trusted time, revocation, cumulative-log proofs, and an optional policy-bound continuity assessment.
\end{quote}

\subsection{Consumer One-Liner}

\begin{quote}
Verify the signed evidence first; show a domain-specific continuity or risk assessment only when a named, evaluated policy applies.
\end{quote}



% ============================================================
\section{Implementation Completeness Addendum: Buildable Product Specification}
% ============================================================

This addendum is normative for implementation planning. The preceding sections define the research architecture, protocol objects, privacy model, trust-scoring science, graph geometry, threat model, and product thesis. This section defines when those ideas become buildable, testable, versioned, auditable, and release-candidate-compliant.

\begin{principlebox}{Architecture-to-Implementation Bridge}
A concept in this specification is not implementation-complete until it has: (1) a machine-readable schema, (2) deterministic validation rules, (3) a canonicalization rule, (4) at least one valid example, (5) at least three invalid examples, (6) a test vector, and (7) a migration rule for future versions.
\end{principlebox}

\subsection{Scope of This Addendum}

The goal of this addendum is not to add more theory. It converts the hyper-specific research architecture into the artifacts engineers need to build the product.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.26\textwidth} X}
\toprule
Area & Required Output \\
\midrule
Schemas & JSON Schema files for every normative object family. \\
Algorithms & Deterministic pseudocode for feature extraction, scoring, calibration, graph construction, drift, Sybil assessment, leakage scoring, and agent authorization. \\
Test vectors & Fixed inputs and expected outputs for every object, algorithm, and failure mode. \\
Versioning & Coexistence rules for v1 and v2 objects, unknown versions, deprecation, and migration. \\
UX & Required verifier states, warning semantics, consent prompts, appeal flows, and agent review screens. \\
Operations & Provider onboarding, auditor onboarding, SLOs, incident escalation, key ceremonies, monitoring, and runbooks. \\
Governance & Open-source scorer release process, model cards, benchmark gates, community review, and alternative-provider compatibility. \\
Conformance & Release-candidate levels so the product can ship staged subsets without pretending to implement the entire research roadmap. \\
\bottomrule
\end{tabularx}
\end{center}




\subsection{Normative Consistency Patch v4}

This version resolves implementation ambiguities introduced by the broader v2 architecture. The following rules are now normative:

\begin{enumerate}
    \item Signed and hashed protocol examples MUST use RFC 8785 JCS and MUST NOT contain JSON floating-point numbers under the TSL core profile.
    \item Basis-point fields use the suffix \texttt{\_bps}; milli-count fields use \texttt{\_milli}; minor currency units use \texttt{\_minor\_units}.
    \item \texttt{delegation\_policy.v2} uses \texttt{policy\_id}; \texttt{agent\_action.v2} uses \texttt{issued\_at} and \texttt{parameters\_commitment}.
    \item \texttt{sybil\_assessment.v1} uses \texttt{risk\_score\_bps} and \texttt{risk\_label}; \texttt{drift\_report.v1} uses \texttt{drift\_score\_bps}, \texttt{drift\_label}, and \texttt{action}.
    \item Portable verification is anchored by \texttt{proof\_bundle.v1}.
    \item API and verifier errors MUST use the canonical error-code registry.
    \item Research equations are non-canonical unless translated into deterministic fixed-point algorithms and test vectors.
\end{enumerate}

\subsection{Spec-to-Artifact Traceability Matrix}

Every normative object introduced in this specification MUST map to a schema file, a validator, at least one valid example, invalid examples, and a deterministic test vector before it can be considered implementation-complete.


\begin{lstlisting}[style=tslcode]
# Each object below requires:
#   1. specs/json-schema/<schema>
#   2. a validator in core-ts and core-rust
#   3. examples/valid/<object>.json
#   4. examples/invalid/<object>/*.json
#   5. test-vectors/<object>/<case>.json

tsl.identity.v1
  schema: identity.v1.schema.json
  vector: identity.v1/valid-local.json

tsl.event_commitment.v1
  schema: event_commitment.v1.schema.json
  vector: event_commitment.v1/deterministic-message.json

tsl.receipt_commitment.v1
  schema: receipt_commitment.v1.schema.json
  vector: receipt_commitment.v1/replied.json

tsl.receipt_log_entry.v1
  schema: receipt_log_entry.v1.schema.json
  vector: receipt_log_entry.v1/opaque-public-leaf.json

tsl.relay_receipt.v1
  schema: relay_receipt.v1.schema.json
  vector: relay_receipt.v1/pre-revocation-promise.json

tsl.consistency_proof.v1
  schema: consistency_proof.v1.schema.json
  vector: consistency_proof.v1/rfc9162-size-8-to-13.json

tsl.revocation.v1
  schema: revocation.v1.schema.json
  vector: revocation.v1/compromise.json

tsl.batch_checkpoint.v1
  schema: batch_checkpoint.v1.schema.json
  vector: batch_checkpoint.v1/single-leaf.json

tsl.inclusion_proof.v1
  schema: inclusion_proof.v1.schema.json
  vector: inclusion_proof.v1/single-leaf.json

tsl.scoring_profile.v2
  schema: scoring_profile.v2.schema.json
  vector: scoring_profile.v2/valid-transparent.json

tsl.feature_definition.v2
  schema: feature_definition.v2.schema.json
  vector: feature_definition.v2/identity-age.json

tsl.domain_policy.v1
  schema: domain_policy.v1.schema.json
  vector: domain_policy.v1/agent-payments.json

tsl.evidence_coverage.v1
  schema: evidence_coverage.v1.schema.json
  vector: evidence_coverage.v1/high-coverage.json

tsl.continuity_assessment.v2
  schema: continuity_assessment.v2.schema.json
  vector: continuity_assessment.v2/likely-continuous-release.json

tsl.metadata_fingerprint_commitment.v1
  schema: metadata_fingerprint_commitment.v1.schema.json
  vector: metadata_fingerprint_commitment.v1/pairwise.json

tsl.graph_profile.v2
  schema: graph_profile.v2.schema.json
  vector: graph_profile.v2/default.json

tsl.graph_feature_vector.v1
  schema: graph_feature_vector.v1.schema.json
  vector: graph_feature_vector.v1/small-graph.json

tsl.sybil_assessment.v1
  schema: sybil_assessment.v1.schema.json
  vector: sybil_assessment.v1/cluster-b2.json

tsl.drift_report.v1
  schema: drift_report.v1.schema.json
  vector: drift_report.v1/dormant-reactivation.json

tsl.attestation.v2
  schema: attestation.v2.schema.json
  vector: attestation.v2/appealed-negative.json

tsl.model_card.v2
  schema: model_card.v2.schema.json
  vector: model_card.v2/reference-scorer.json

tsl.evaluation_report.v1
  schema: evaluation_report.v1.schema.json
  vector: evaluation_report.v1/promotion-pass.json

tsl.delegation_policy.v2
  schema: delegation_policy.v2.schema.json
  vector: delegation_policy.v2/invoice-agent.json

tsl.agent_action.v2
  schema: agent_action.v2.schema.json
  vector: agent_action.v2/inside-scope.json
\end{lstlisting}

\subsection{Mandatory Artifact Tree}


The repository MUST be structured so the LaTeX specification, schemas, examples, tests, algorithms, and conformance levels remain synchronized.

\begin{lstlisting}[style=tslcode]
tsl/
  specs/
    latex/
      Trust_Signature_Layer_full_implementation_v3.tex
    json-schema/
      identity.v1.schema.json
      event_commitment.v1.schema.json
      receipt_commitment.v1.schema.json
      receipt_log_entry.v1.schema.json
      relay_receipt.v1.schema.json
      revocation.v1.schema.json
      batch_checkpoint.v1.schema.json
      inclusion_proof.v1.schema.json
      consistency_proof.v1.schema.json
      proof_bundle.v1.schema.json
      scoring_profile.v2.schema.json
      feature_definition.v2.schema.json
      domain_policy.v1.schema.json
      evidence_coverage.v1.schema.json
      continuity_assessment.v2.schema.json
      metadata_fingerprint_commitment.v1.schema.json
      graph_profile.v2.schema.json
      graph_feature_vector.v1.schema.json
      sybil_assessment.v1.schema.json
      drift_report.v1.schema.json
      attestation.v2.schema.json
      model_card.v2.schema.json
      evaluation_report.v1.schema.json
      delegation_policy.v2.schema.json
      agent_action.v2.schema.json
    openapi/
      relay-api.v1.yaml
      verifier-api.v1.yaml
      resolver-api.v1.yaml
      scoring-provider-api.v1.yaml
      auditor-api.v1.yaml
    examples/
      valid/
      invalid/
    test-vectors/
      canonicalization/
      signatures/
      merkle/
      verifier/
      scoring-v0/
      graph-v0/
      sybil-v0/
      drift-v0/
      metadata-fingerprints-v0/
      delegation-v0/
  algorithms/
    reference-scorer-v0.md
    graph-construction-v0.md
    drift-baseline-v0.md
    sybil-simulation-v0.md
    calibration-v0.md
    leakage-score-v0.md
    delegation-authorization-v0.md
  conformance/
    tsl-rc0.md
    tsl-rc1.md
    tsl-rc2.md
    tsl-rc3.md
    tsl-rc4.md
    tsl-mainnet.md
\end{lstlisting}

\subsection{Machine-Readable Schema Requirements}

A v2 object defined only in prose, equations, or illustrative JSON is not implementation-complete. Each normative object schema MUST include:

\begin{enumerate}
    \item a stable \texttt{\$id};
    \item a fixed \texttt{type} discriminator;
    \item explicit required fields;
    \item \texttt{additionalProperties: false} unless a declared extension namespace is present;
    \item canonical integer units for scores, durations, timestamps, costs, percentages, probabilities, and basis-point values;
    \item no floating-point values in signed payloads;
    \item explicit enum values for labels, domains, object states, failure codes, claim classes, and governance statuses;
    \item a deterministic canonicalization rule before hashing or signing;
    \item at least one valid example;
    \item at least three invalid examples: missing required field, malformed signature/hash, and unknown non-extension field;
    \item a migration note describing how this object interacts with prior versions.
\end{enumerate}

\begin{warningbox}{Signed Payload Rule}
Signed payloads MUST NOT contain floating-point values. Probabilities, scores, rates, and weights MUST be encoded as integers in basis points, parts per million, or explicitly specified fixed-point units.
\end{warningbox}

\subsection{Schema Skeletons for New v2 Object Families}

The following schema skeletons are normative patterns. The repository schemas MAY add narrower constraints, but MUST NOT weaken these requirements.



\subsubsection{Schema Pattern: \texttt{tsl.proof\_bundle.v1}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/proof_bundle.v1.schema.json",
  "type": "object",
  "required": ["type", "bundle_id", "created_at", "envelope", "proof", "checkpoint", "identity", "redaction_manifest"],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.proof_bundle.v1" },
    "bundle_id": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "created_at": { "type": "string", "format": "date-time" },
    "envelope": { "type": "object" },
    "proof": { "type": "object" },
    "checkpoint": { "type": "object" },
    "identity": { "type": "object" },
    "receipts": { "type": "array", "items": { "type": "object" } },
    "attestations": { "type": "array", "items": { "type": "object" } },
    "revocations": { "type": "array", "items": { "type": "object" } },
    "assessment": { "type": ["object", "null"] },
    "assessment_v2": { "type": ["object", "null"] },
    "zk_proofs": { "type": "array", "items": { "type": "object" } },
    "delegations": { "type": "array", "items": { "type": "object" } },
    "audit_findings": { "type": "array", "items": { "type": "object" } },
    "governance_policy": { "type": "object" },
    "redaction_manifest": {
      "type": "object",
      "required": ["raw_content_included", "exact_counterparties_included", "metadata_fields_redacted"],
      "additionalProperties": false,
      "properties": {
        "raw_content_included": { "type": "boolean" },
        "exact_counterparties_included": { "type": "boolean" },
        "metadata_fields_redacted": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.scoring\_profile.v2}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/scoring_profile.v2.schema.json",
  "type": "object",
  "required": [
    "type",
    "profile_id",
    "provider",
    "domain",
    "model_family",
    "model_version",
    "feature_registry_commitment",
    "normalization_profile_commitment",
    "weight_profile_commitment",
    "calibration_profile_commitment",
    "threshold_policy_commitment",
    "privacy_policy_commitment",
    "evaluation_report_commitment",
    "issued_at",
    "valid_after",
    "expires_at",
    "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.scoring_profile.v2" },
    "profile_id": { "type": "string", "minLength": 1 },
    "provider": { "type": "string", "pattern": "^did:tsl:" },
    "domain": {
      "enum": [
        "anti_phishing",
        "marketplace_trust",
        "agent_delegation",
        "opensource_maintainer",
        "professional_identity",
        "customer_support",
        "local_verifier"
      ]
    },
    "model_family": {
      "enum": [
        "transparent_weighted_logistic",
        "calibrated_tree_ensemble",
        "graph_risk_model",
        "local_rule_policy",
        "human_review_hybrid"
      ]
    },
    "model_version": { "type": "string", "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+" },
    "feature_registry_uri": { "type": "string" },
    "feature_registry_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "normalization_profile_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "weight_profile_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "calibration_profile_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "threshold_policy_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "privacy_policy_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "evaluation_report_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "appeal_policy_uri": { "type": "string" },
    "issued_at": { "type": "string", "format": "date-time" },
    "valid_after": { "type": "string", "format": "date-time" },
    "expires_at": { "type": "string", "format": "date-time" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.feature\_definition.v2}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/feature_definition.v2.schema.json",
  "type": "object",
  "required": [
    "type",
    "feature_id",
    "name",
    "family",
    "value_type",
    "unit",
    "range",
    "normalization_method",
    "privacy_class",
    "spoofing_cost_class",
    "missing_value_policy",
    "attack_notes"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.feature_definition.v2" },
    "feature_id": { "type": "string" },
    "name": { "type": "string" },
    "family": {
      "enum": [
        "cryptographic",
        "temporal",
        "graph",
        "receipts",
        "attestations",
        "behavioral_drift",
        "adversarial_proximity",
        "local_context",
        "delegation"
      ]
    },
    "value_type": { "enum": ["boolean", "integer", "bps", "count", "duration_ms", "enum"] },
    "unit": { "type": "string" },
    "range": {
      "type": "object",
      "required": ["min", "max"],
      "properties": {
        "min": { "type": "integer" },
        "max": { "type": "integer" }
      }
    },
    "normalization_method": {
      "enum": ["identity", "log1p_cap", "winsorized_z", "percentile_rank", "piecewise_linear", "binary"]
    },
    "privacy_class": { "enum": ["public", "commitment", "aggregate", "pairwise", "local_only", "forbidden"] },
    "spoofing_cost_class": { "enum": ["low", "medium", "high", "very_high"] },
    "missing_value_policy": { "enum": ["zero", "neutral", "abstain", "domain_default", "provider_default"] },
    "attack_notes": { "type": "array", "items": { "type": "string" } }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.domain\_policy.v1}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/domain_policy.v1.schema.json",
  "type": "object",
  "required": [
    "type",
    "domain",
    "policy_version",
    "target_action_class",
    "requires_settlement",
    "requires_trusted_time_binding",
    "min_coverage_bps",
    "max_assessment_age_seconds",
    "false_positive_cost_class",
    "false_negative_cost_class",
    "sparse_identity_default",
    "thresholds"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.domain_policy.v1" },
    "domain": { "type": "string" },
    "policy_version": { "type": "string" },
    "target_action_class": { "type": "string" },
    "requires_settlement": { "type": "boolean" },
    "requires_trusted_time_binding": { "type": "boolean" },
    "requires_delegation_check": { "type": "boolean" },
    "requires_content_opening": { "type": "boolean" },
    "min_coverage_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "max_assessment_age_seconds": { "type": "integer", "minimum": 1 },
    "false_positive_cost_class": { "enum": ["low", "medium", "high", "critical"] },
    "false_negative_cost_class": { "enum": ["low", "medium", "high", "critical"] },
    "sparse_identity_default": { "enum": ["insufficient_evidence", "unknown_caution", "require_step_up", "deny_high_value_action"] },
    "thresholds": {
      "type": "object",
      "required": [
        "strong_continuity_min_bps",
        "likely_continuous_min_bps",
        "mixed_continuity_min_bps",
        "elevated_risk_max_bps",
        "high_risk_max_bps"
      ],
      "additionalProperties": false,
      "properties": {
        "strong_continuity_min_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "likely_continuous_min_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "mixed_continuity_min_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "elevated_risk_max_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "high_risk_max_bps": { "type": "integer", "minimum": 0, "maximum": 10000 }
      }
    }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.continuity\_assessment.v2}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/continuity_assessment.v2.schema.json",
  "type": "object",
  "required": [
    "type",
    "assessment_id",
    "target_event_commitment",
    "subject",
    "issuer",
    "domain",
    "policy_id",
    "scoring_profile_id",
    "model_version",
    "gate_result",
    "coverage_bps",
    "label",
    "recommended_action",
    "reason_codes",
    "risk_codes",
    "issued_at",
    "expires_at",
    "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.continuity_assessment.v2" },
    "assessment_id": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "target_event_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "subject": { "type": "string", "pattern": "^did:tsl:" },
    "issuer": { "type": "string", "pattern": "^did:tsl:" },
    "domain": { "type": "string" },
    "policy_id": { "type": "string" },
    "scoring_profile_id": { "type": "string" },
    "model_version": { "type": "string" },
    "gate_result": {
      "type": "object",
      "required": [
        "schema_valid", "canonicalization_valid", "signature_valid",
        "key_active", "not_revoked", "trusted_time_binding_valid",
        "included_in_log", "checkpoint_valid"
      ],
      "additionalProperties": false,
      "properties": {
        "schema_valid": { "type": "boolean" },
        "canonicalization_valid": { "type": "boolean" },
        "signature_valid": { "type": "boolean" },
        "key_active": { "type": "boolean" },
        "not_revoked": { "type": "boolean" },
        "trusted_time_binding_valid": { "type": "boolean" },
        "included_in_log": { "type": "boolean" },
        "checkpoint_valid": { "type": "boolean" },
        "settlement_satisfied": { "type": "boolean" },
        "delegation_valid": { "type": "boolean" }
      }
    },
    "continuity_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "confidence_interval_bps": {
      "type": "array", "minItems": 2, "maxItems": 2,
      "items": { "type": "integer", "minimum": 0, "maximum": 10000 }
    },
    "coverage_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "label": {
      "enum": [
        "strong_continuity", "likely_continuous", "mixed_continuity",
        "unknown_caution", "insufficient_evidence", "elevated_risk",
        "high_risk", "cryptographic_failure", "revoked_or_compromised",
        "settlement_missing", "time_binding_failure"
      ]
    },
    "recommended_action": { "enum": ["allow", "allow_with_monitoring", "step_up", "human_review", "block", "not_applicable"] },
    "reason_codes": { "type": "array", "items": { "type": "string" } },
    "risk_codes": { "type": "array", "items": { "type": "string" } },
    "feature_vector_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "evidence_coverage_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "privacy_disclosure_level": { "enum": ["none", "aggregate_only", "pairwise", "selective", "public"] },
    "appeal_uri": { "type": "string" },
    "issued_at": { "type": "string", "format": "date-time" },
    "expires_at": { "type": "string", "format": "date-time" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  },
  "oneOf": [
    {
      "properties": { "label": { "enum": ["cryptographic_failure", "revoked_or_compromised", "settlement_missing", "time_binding_failure"] } },
      "not": { "required": ["continuity_bps"] }
    },
    {
      "required": ["continuity_bps", "confidence_interval_bps"],
      "properties": { "label": { "enum": ["strong_continuity", "likely_continuous", "mixed_continuity", "unknown_caution", "insufficient_evidence", "elevated_risk", "high_risk"] } }
    }
  ]
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.metadata\_fingerprint\_commitment.v1}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/metadata_fingerprint_commitment.v1.schema.json",
  "type": "object",
  "required": [
    "type",
    "subject",
    "scope_class",
    "scope_commitment",
    "bucket_profile",
    "fingerprint_commitment",
    "created_at_bucket",
    "expires_at",
    "disclosure_policy",
    "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.metadata_fingerprint_commitment.v1" },
    "subject": { "type": "string", "pattern": "^did:tsl:" },
    "scope_class": { "enum": ["local_only", "pairwise_verifier", "provider_ephemeral", "public_commitment"] },
    "scope_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "bucket_profile": { "type": "string" },
    "fingerprint_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "salt_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "created_at_bucket": { "type": "string" },
    "expires_at": { "type": "string", "format": "date-time" },
    "disclosure_policy": { "enum": ["local_only", "selective", "zk_only", "public_commitment_only"] },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.graph\_profile.v2} and \texttt{tsl.graph\_feature\_vector.v1}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/graph_profile.v2.schema.json",
  "type": "object",
  "required": [
    "type",
    "profile_id",
    "edge_weight_profile",
    "temporal_decay_profile",
    "community_detection",
    "seed_sets",
    "negative_edge_policy",
    "privacy_policy"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.graph_profile.v2" },
    "profile_id": { "type": "string" },
    "edge_weight_profile": { "type": "string" },
    "temporal_decay_profile": { "type": "string" },
    "community_detection": {
      "type": "object",
      "required": ["algorithm", "resolution_bps", "min_cluster_size"],
      "additionalProperties": false,
      "properties": {
        "algorithm": { "enum": ["leiden", "louvain", "connected_components", "none"] },
        "resolution_bps": { "type": "integer", "minimum": 1 },
        "min_cluster_size": { "type": "integer", "minimum": 1 },
        "edge_weight_floor_bps": { "type": "integer", "minimum": 0, "maximum": 10000 }
      }
    },
    "seed_sets": { "type": "object" },
    "negative_edge_policy": { "type": "object" },
    "privacy_policy": { "type": "object" }
  }
}

{
  "$id": "https://spec.tsl.network/schemas/graph_feature_vector.v1.schema.json",
  "type": "object",
  "required": [
    "type",
    "subject",
    "graph_profile_id",
    "computed_at",
    "weighted_degree_bps",
    "reciprocity_bps",
    "counterparty_hhi_bps",
    "counterparty_entropy_bps",
    "effective_counterparty_count_milli",
    "seed_escape_bps",
    "adversarial_proximity_bps",
    "privacy_disclosure_level"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.graph_feature_vector.v1" },
    "subject": { "type": "string", "pattern": "^did:tsl:" },
    "graph_profile_id": { "type": "string" },
    "computed_at": { "type": "string", "format": "date-time" },
    "weighted_degree_bps": { "type": "integer", "minimum": 0 },
    "reciprocity_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "counterparty_hhi_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "counterparty_entropy_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "effective_counterparty_count_milli": { "type": "integer", "minimum": 0 },
    "seed_escape_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "adversarial_proximity_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "privacy_disclosure_level": { "enum": ["aggregate_only", "pairwise", "local_only", "public"] }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: \texttt{tsl.sybil\_assessment.v1} and \texttt{tsl.drift\_report.v1}}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/sybil_assessment.v1.schema.json",
  "type": "object",
  "required": [
    "type",
    "subject",
    "cluster_id_commitment",
    "computed_at",
    "adversary_tier_assumed",
    "cluster_concentration_bps",
    "trusted_escape_bps",
    "internal_receipt_ratio_bps",
    "attack_cost_minor_units",
    "risk_score_bps",
    "risk_label",
    "privacy_level",
    "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.sybil_assessment.v1" },
    "subject": { "type": "string", "pattern": "^did:tsl:" },
    "cluster_id_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "computed_at": { "type": "string", "format": "date-time" },
    "adversary_tier_assumed": { "enum": ["B0", "B1", "B2", "B3", "B4", "B5"] },
    "cluster_size_bucket": { "type": "string" },
    "cluster_concentration_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "trusted_escape_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "internal_receipt_ratio_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "creation_sync_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "issuer_reuse_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "external_diversity_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "attack_cost_minor_units": { "type": "integer", "minimum": 0 },
    "risk_score_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "risk_label": { "enum": ["low", "medium", "elevated", "high", "insufficient_evidence"] },
    "privacy_level": { "enum": ["cluster_commitment_only", "aggregate_only", "local_only"] },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}

{
  "$id": "https://spec.tsl.network/schemas/drift_report.v1.schema.json",
  "type": "object",
  "required": [
    "type",
    "subject",
    "computed_at",
    "baseline_window_days",
    "observation_window_days",
    "drift_score_bps",
    "drift_label",
    "action",
    "reason_codes",
    "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.drift_report.v1" },
    "subject": { "type": "string", "pattern": "^did:tsl:" },
    "computed_at": { "type": "string", "format": "date-time" },
    "baseline_window_days": { "type": "integer", "minimum": 1 },
    "observation_window_days": { "type": "integer", "minimum": 1 },
    "drift_score_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
    "drift_label": { "enum": ["stable", "minor", "moderate", "severe", "dormant_reactivation", "insufficient_baseline"] },
    "action": { "enum": ["none", "lower_confidence", "step_up", "human_review", "temporary_block"] },
    "reason_codes": { "type": "array", "items": { "type": "string" } },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}
\end{lstlisting}

\subsubsection{Schema Pattern: Governance, Evaluation, and Agent Objects}

\begin{lstlisting}[style=tslcode]
{
  "$id": "https://spec.tsl.network/schemas/model_card.v2.schema.json",
  "type": "object",
  "required": [
    "type", "model_id", "provider", "model_version", "supported_domains",
    "feature_registry_commitment", "evaluation_report_commitment",
    "privacy_report_commitment", "metrics", "limitations", "issued_at", "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.model_card.v2" },
    "model_id": { "type": "string" },
    "provider": { "type": "string", "pattern": "^did:tsl:" },
    "model_version": { "type": "string" },
    "supported_domains": { "type": "array", "items": { "type": "string" } },
    "feature_registry_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "evaluation_report_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "privacy_report_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "metrics": {
      "type": "object",
      "required": ["auroc_bps", "auprc_bps", "ece_bps", "p95_latency_ms"],
      "additionalProperties": false,
      "properties": {
        "auroc_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "auprc_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "ece_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "sparse_identity_false_positive_rate_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "p95_latency_ms": { "type": "integer", "minimum": 0 },
        "appeal_reversal_rate_bps": { "type": "integer", "minimum": 0, "maximum": 10000 }
      }
    },
    "limitations": { "type": "array", "items": { "type": "string" } },
    "issued_at": { "type": "string", "format": "date-time" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}

{
  "$id": "https://spec.tsl.network/schemas/evaluation_report.v1.schema.json",
  "type": "object",
  "required": [
    "type", "report_id", "model_id", "domain", "dataset_commitments",
    "metrics", "promotion_gate_result", "red_team_result", "issued_at", "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.evaluation_report.v1" },
    "report_id": { "type": "string" },
    "model_id": { "type": "string" },
    "domain": { "type": "string" },
    "dataset_commitments": { "type": "array", "items": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" } },
    "metrics": {
      "type": "object",
      "required": ["auroc_bps", "auprc_bps", "ece_bps", "coverage_bps", "p95_latency_ms"],
      "properties": {
        "auroc_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "auprc_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "ece_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "coverage_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "sparse_identity_fpr_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "privacy_leakage_bps": { "type": "integer", "minimum": 0, "maximum": 10000 },
        "p95_latency_ms": { "type": "integer", "minimum": 0 }
      }
    },
    "promotion_gate_result": { "enum": ["pass", "fail", "conditional", "research_only"] },
    "red_team_result": { "enum": ["pass", "fail", "not_run"] },
    "issued_at": { "type": "string", "format": "date-time" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}

{
  "$id": "https://spec.tsl.network/schemas/delegation_policy.v2.schema.json",
  "type": "object",
  "required": [
    "type", "policy_id", "principal", "delegate", "effect", "actions",
    "resources", "constraints", "valid_from", "valid_until", "revocation_pointer", "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.delegation_policy.v2" },
    "policy_id": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "principal": { "type": "string", "pattern": "^did:tsl:" },
    "delegate": { "type": "string", "pattern": "^did:tsl:" },
    "effect": { "enum": ["allow", "deny"] },
    "actions": { "type": "array", "items": { "type": "string" } },
    "resources": { "type": "array", "items": { "type": "string" } },
    "constraints": { "type": "object" },
    "subdelegation": { "type": "object" },
    "valid_from": { "type": "string", "format": "date-time" },
    "valid_until": { "type": "string", "format": "date-time" },
    "revocation_pointer": { "type": "string" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}

{
  "$id": "https://spec.tsl.network/schemas/agent_action.v2.schema.json",
  "type": "object",
  "required": [
    "type", "action_id", "agent", "principal", "action", "resource",
    "parameters_commitment", "delegation_chain_root", "issued_at", "nonce", "signature"
  ],
  "additionalProperties": false,
  "properties": {
    "type": { "const": "tsl.agent_action.v2" },
    "action_id": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "agent": { "type": "string", "pattern": "^did:tsl:" },
    "principal": { "type": "string", "pattern": "^did:tsl:" },
    "action": { "type": "string" },
    "resource": { "type": "string" },
    "tool": { "type": "string" },
    "parameters_commitment": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "parameter_disclosure_policy": { "enum": ["commitment_only", "selective", "zk_only", "public"] },
    "delegation_chain_root": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "issued_at": { "type": "string", "format": "date-time" },
    "nonce": { "type": "string", "pattern": "^0x[0-9a-f]{64}$" },
    "signature": { "type": "string", "pattern": "^0x[0-9a-f]+$" }
  }
}
\end{lstlisting}

\subsection{Executable Reference Algorithm Registry}

Every reference algorithm MUST be deterministic for the same input set, profile version, and clock value. Any implementation that uses randomized sampling, approximate graph algorithms, or nondeterministic ordering MUST declare the seed, ordering rule, and approximation tolerance in the relevant profile.


\begin{lstlisting}[style=tslcode]
extractFeatureVectorV0
  Sort evidence by canonical hash; ignore objects failing verification;
  output fixed field order.

normalizeFeatureVectorV0
  Use profile-specified integer fixed-point normalization;
  no implementation-specific floats.

computeReferenceScoreV0
  Integer basis-point arithmetic; explicit rounding mode:
  floor after each weighted term.

selectThresholdsV0
  Apply domain-policy thresholds and adverse-evidence rule exactly.

calibrateScoreV0
  Use signed calibration lookup table or monotonic piecewise-linear mapping.

computeConfidenceIntervalV0
  Use deterministic bootstrap seed from evidence commitment or analytic
  interval profile.

constructGraphV0
  Sort edges by timestamp then canonical hash; discard unverifiable edges.

computeGraphMetricsV0
  Use declared graph profile; report approximation tolerance if used.

computeSybilAssessmentV0
  Use declared adversary tier, cost model, cluster profile, and seed sets.

computeDriftReportV0
  Use fixed windows and robust baseline profile; return insufficient
  baseline when needed.

computeMetadataFingerprintCommitmentV0
  Use scoped KDF, bucket profile, HMAC, salt, and commitment rules exactly.

computeLeakageScoreV0
  Use integer-weighted leakage components and policy thresholds.

verifyDelegatedAgentActionV0
  Validate policy signature, time, revocation, action, resource,
  constraints, and chain intersection.
\end{lstlisting}


\subsubsection{Reference Continuity Assessment v0}

\begin{lstlisting}[style=tslcode]
function computeReferenceContinuityV0(input, scoringProfile, domainPolicy, atTime): ContinuityAssessmentV2 {
  gate = verifyHardGates(input, domainPolicy, atTime)

  if gate.schema_valid == false:
    return failureAssessment("cryptographic_failure", "TSL_SCHEMA_INVALID", gate)
  if gate.signature_valid == false:
    return failureAssessment("cryptographic_failure", "TSL_SIGNATURE_INVALID", gate)
  if gate.key_active == false or gate.not_revoked == false or gate.trusted_time_binding_valid == false:
    return failureAssessment("revoked_or_compromised", "TSL_KEY_REVOKED", gate)
  if domainPolicy.requires_settlement and gate.settlement_satisfied == false:
    return failureAssessment("settlement_missing", "TSL_SETTLEMENT_MISSING", gate)

  features = extractFeatureVectorV0(input.evidence, scoringProfile.feature_registry, atTime)
  coverage = computeEvidenceCoverageV0(features, input.evidence, atTime)

  if coverage.coverage_bps < domainPolicy.min_coverage_bps and features.has_adverse_evidence == false:
    return abstainAssessment("insufficient_evidence", gate, coverage)

  normalized = normalizeFeatureVectorV0(features, scoringProfile.normalization_profile)

  continuity_evidence_bps = 0
  for item in scoringProfile.weight_profile.features sorted by item.feature_id:
    value_bps = normalized[item.feature_id]
    weight_bps = item.weight_bps
    continuity_evidence_bps += floor(value_bps * weight_bps / 10000)

  calibrated_bps = calibrateContinuityV0(continuity_evidence_bps, scoringProfile.calibration_profile)
  confidence = computeConfidenceIntervalV0(input.evidence, scoringProfile.confidence_profile)
  label = selectLabelV0(calibrated_bps, confidence, coverage, features, domainPolicy)

  return signContinuityAssessmentV2({target_event_commitment: input.target_event_commitment,
    subject: input.subject,
    issuer: scoringProfile.provider,
    domain: domainPolicy.domain,
    scoring_profile_id: scoringProfile.profile_id,
    gate_result: gate,
    continuity_bps: calibrated_bps,
    confidence_interval_bps: confidence,
    coverage_bps: coverage.coverage_bps,
    label: label,
    reason_codes: reasonCodes(features, normalized),
    risk_codes: riskCodes(features),
    issued_at: atTime,
    expires_at: atTime + domainPolicy.max_assessment_age_seconds
  })
}
\end{lstlisting}

\subsubsection{Graph Construction v0}

\begin{lstlisting}[style=tslcode]
function constructGraphV0(events, receipts, attestations, delegations, graphProfile, atTime): Graph {
  G = empty directed typed multigraph

  verifiedEvents = []
  for event in events:
    if verifyEvent(event, atTime).cryptographic_validity == true:
      verifiedEvents.append(event)
  sort verifiedEvents by (trustedEventTime(event), canonicalHash(event))

  for event in verifiedEvents:
    if event.receiver_disclosed == false:
      continue
    G.addEdge({
      src: event.sender,
      dst: event.receiver,
      type: "signed_event",
      timestamp: trustedEventTime(event),
      base_weight_bps: graphProfile.edge_weights.signed_event_bps,
      evidence_hash: canonicalHash(event)
    })

  verifiedReceipts = filterVerifyDisclosedReceiptsAndSort(receipts, atTime)
  # Opaque public receipt log entries are not graph edges.
  for receipt in verifiedReceipts:
    linkedSender = senderOf(receipt.event_commitment)
    G.addEdge({
      src: receipt.receiver,
      dst: linkedSender,
      type: receipt.receipt_class,
      timestamp: trustedReceiptTime(receipt),
      base_weight_bps: graphProfile.edge_weights[receipt.receipt_class],
      evidence_hash: canonicalHash(receipt)
    })

  verifiedAttestations = filterVerifyAndSort(attestations, atTime)
  for attestation in verifiedAttestations:
    if attestation.expires_at <= atTime:
      continue
    G.addEdge({
      src: attestation.issuer,
      dst: attestation.subject,
      type: attestation.attestation_class,
      timestamp: attestation.issued_at,
      base_weight_bps: issuerAdjustedWeight(attestation, graphProfile),
      evidence_hash: canonicalHash(attestation)
    })

  verifiedDelegations = filterVerifyAndSort(delegations, atTime)
  for delegation in verifiedDelegations:
    if delegation.valid_from <= atTime and atTime < delegation.valid_until and not revoked(delegation):
      G.addEdge({
        src: delegation.principal,
        dst: delegation.delegate,
        type: "delegation",
        timestamp: delegation.valid_from,
        base_weight_bps: graphProfile.edge_weights.delegation_bps,
        evidence_hash: canonicalHash(delegation)
      })

  applyTemporalDecay(G, graphProfile.temporal_decay_profile, atTime)
  return G
}
\end{lstlisting}

\subsubsection{Sybil Assessment v0}

\begin{lstlisting}[style=tslcode]
function computeSybilAssessmentV0(subject, graph, graphProfile, sybilProfile, atTime): SybilAssessmentV1 {
  cluster = communityOf(subject, graph, graphProfile.community_detection)
  internal_mass = sumWeight(edgesWithin(cluster))
  external_mass = sumWeight(edgesLeaving(cluster))
  trusted_escape_mass = sumWeight(edgesFromClusterToTrustedSeeds(cluster, sybilProfile.trusted_seed_set))
  adversarial_seed_mass = sumWeight(edgesFromClusterToAdversarialSeeds(cluster, sybilProfile.adversarial_seed_set))

  cluster_concentration_bps = bps(internal_mass, internal_mass + external_mass)
  trusted_escape_bps = bps(trusted_escape_mass, internal_mass + external_mass)
  internal_receipt_ratio_bps = bps(receiptMassWithin(cluster), receiptMassTouching(cluster))
  seed_contamination_bps = bps(adversarial_seed_mass, internal_mass + external_mass)

  attack_cost = estimateAttackCostV0(cluster, sybilProfile.cost_model)

  if evidenceMass(cluster) < sybilProfile.min_evidence_mass:
    risk_label = "insufficient_evidence"
  else if cluster_concentration_bps > 8500 and trusted_escape_bps < 500:
    risk_label = "high"
  else if seed_contamination_bps > 2500:
    risk_label = "elevated"
  else if internal_receipt_ratio_bps > 7500 and trusted_escape_bps < 1500:
    risk_label = "medium"
  else:
    risk_label = "low"

  return signSybilAssessmentV1({subject, cluster, metrics, attack_cost, risk_label, atTime})
}
\end{lstlisting}

\subsubsection{Drift Report v0}

\begin{lstlisting}[style=tslcode]
function computeDriftReportV0(subject, featureHistory, driftProfile, atTime): DriftReportV1 {
  baseline = selectWindow(featureHistory, atTime - driftProfile.baseline_days, atTime - driftProfile.observation_days)
  observation = selectWindow(featureHistory, atTime - driftProfile.observation_days, atTime)

  if count(baseline) < driftProfile.min_baseline_points:
    return report("insufficient_baseline", 0, "none")

  baselineMedian = robustMedian(baseline)
  baselineCov = robustCovariance(baseline)
  obsMean = mean(observation)

  drift_bps = robustMahalanobisBps(obsMean, baselineMedian, baselineCov, driftProfile.cap_bps)

  dormant = daysSinceLastVerifiedEvent(subject, atTime) >= driftProfile.dormant_days
  highValueChange = observationHasHighValueNewAction(observation)
  newDelegation = observationHasNewDelegationPattern(observation)
  adverse = observationHasAdverseEvidence(observation)

  if dormant and (highValueChange or newDelegation):
    return report("dormant_reactivation", max(drift_bps, 8000), "step_up")
  if adverse and drift_bps >= driftProfile.severe_bps:
    return report("severe", drift_bps, "human_review")
  if drift_bps >= driftProfile.moderate_bps:
    return report("moderate", drift_bps, "lower_confidence")
  if drift_bps >= driftProfile.minor_bps:
    return report("minor", drift_bps, "none")
  return report("stable", drift_bps, "none")
}
\end{lstlisting}

\subsubsection{Metadata Fingerprint Commitment v0}

\begin{lstlisting}[style=tslcode]
function computeMetadataFingerprintCommitmentV0(metadata, masterKey, context, verifierDomain, epoch, purpose, salt): FingerprintCommitment {
  assert purpose in ["local_only", "pairwise_verifier", "provider_ephemeral", "public_commitment"]
  assert salt.length == 32

  bucketed = bucketizeMetadata(metadata, context.bucket_profile)
  scopeKey = KDF(masterKey, "tsl-fp-v1" || context.id || verifierDomain || epoch || purpose)
  fingerprint = HMAC(scopeKey, "tsl.metadata.fp.v1" || canonicalize(bucketed))
  commitment = HASH("tsl.metadata.commit.v1" || fingerprint || salt)

  return {
    type: "tsl.metadata_fingerprint_commitment.v1",
    scope_class: purpose,
    scope_commitment: HASH(verifierDomain || epoch || purpose),
    bucket_profile: context.bucket_profile,
    fingerprint_commitment: commitment,
    salt_commitment: HASH(salt),
    created_at_bucket: bucketed.time_bucket,
    disclosure_policy: policyForPurpose(purpose)
  }
}
\end{lstlisting}

\subsubsection{Delegated Agent Authorization v0}

\begin{lstlisting}[style=tslcode]
function verifyDelegatedAgentActionV0(action, relayReceipt, checkpoint, delegationChain, resolver, atTime): AuthorizationResult {
  assert action.type == "tsl.agent_action.v2"
  assert verifySignature(action.agent, canonicalHashWithoutSignature(action), action.signature)
  trustedTime = verifyTrustedActionTime(action, relayReceipt, checkpoint)

  effectiveScope = universalAllowScope()

  for policy in delegationChain ordered from principal to final delegate:
    if verifySignature(policy.principal, canonicalHashWithoutSignature(policy), policy.signature) == false:
      return fail("TSL_DELEGATION_SIGNATURE_INVALID")
    if trustedTime < policy.valid_from or trustedTime >= policy.valid_until:
      return fail("TSL_DELEGATION_EXPIRED")
    if resolver.isRevoked(policy.revocation_pointer, trustedTime):
      return fail("TSL_DELEGATION_REVOKED")
    if policy.delegate != nextActorInChain(policy, delegationChain, action):
      return fail("TSL_DELEGATION_CHAIN_BROKEN")
    effectiveScope = intersectScopes(effectiveScope, policy.scope)

  if scopeAllows(effectiveScope, action.action, action.resource, action.parameters, atTime) == false:
    return fail("TSL_DELEGATION_SCOPE_VIOLATION")

  if action.value_minor_units > effectiveScope.max_value_minor_units:
    return fail("TSL_DELEGATION_VALUE_LIMIT_EXCEEDED")

  if effectiveScope.requires_human_approval and action.human_approval_proof is null:
    return fail("TSL_HUMAN_APPROVAL_REQUIRED")

  return pass({effective_scope_commitment: canonicalHash(effectiveScope)})
}
\end{lstlisting}

\subsection{Required Test Vectors}

The following test vectors MUST be added before the v2 object set is marked release-candidate.


\begin{lstlisting}[style=tslcode]
scoring_profile.v2/valid-transparent.json
  Assert: schema validates, canonical hash matches expected value,
  provider signature verifies.

scoring_profile.v2/invalid-float.json
  Assert: rejected because signed scoring profiles MUST NOT use floating-point values.

domain_policy.v1/agent-payments.json
  Assert: requires settlement, delegation check, and value-based step-up.

continuity_assessment.v2/cryptographic-failure.json
  Assert: contains no ordinary continuity value and preserves failed gate result.

metadata_fingerprint_commitment.v1/pairwise.json
  Assert: same metadata under two verifier domains produces unlinkable commitments.

metadata_fingerprint_commitment.v1/rotation.json
  Assert: same metadata under different epochs produces different commitments
  when rotation is enabled.

graph_feature_vector.v1/small-graph.json
  Assert: degree, reciprocity, HHI, entropy, effective counterparty count,
  and seed escape match expected values.

sybil_assessment.v1/cluster-b2.json
  Assert: synthetic B2 cluster produces expected concentration, internal
  receipt ratio, attack cost, and risk label.

drift_report.v1/dormant-reactivation.json
  Assert: dormant identity with sudden high-risk activity produces step_up.

attestation.v2/appealed-negative.json
  Assert: appeal changes status without deleting the original signed negative claim.

model_card.v2/reference-scorer.json
  Assert: model card validates and links to evaluation report commitment.

evaluation_report.v1/promotion-pass.json
  Assert: promotion gates are computed deterministically from supplied metrics.

delegation_policy.v2/invoice-agent.json
  Assert: policy canonicalizes and signs deterministically.

agent_action.v2/inside-scope.json
  Assert: agent action verifies as inside delegated scope.

agent_action.v2/outside-scope.json
  Assert: action fails with TSL_DELEGATION_SCOPE_VIOLATION.
\end{lstlisting}


\subsection{Deterministic Test Vector Format}

Every test vector directory MUST contain a manifest with the following structure:

\begin{lstlisting}[style=tslcode]
{
  "type": "tsl.test_vector_manifest.v1",
  "vector_id": "scoring_profile.v2/valid-transparent",
  "spec_version": "3.0.0",
  "object_type": "tsl.scoring_profile.v2",
  "canonicalization": "RFC8785-JCS",
  "hash_suite": "sha256-domain-v1+rfc9162-sha256",
  "signature_suite": "RFC8032-Ed25519",
  "input_files": ["input.json"],
  "expected": {
    "schema_valid": true,
    "canonical_hash": "0x...",
    "signature_valid": true,
    "error_code": null
  }
}
\end{lstlisting}

\subsection{Versioning, Compatibility, and Migration}

\subsubsection{Object Version Rules}

\begin{enumerate}
    \item Object versions are part of the signed \texttt{type} field.
    \item A verifier MUST reject an object whose major version it does not understand unless an explicit forward-compatible extension rule applies.
    \item A verifier MUST NOT reinterpret a v1 object as v2 or a v2 object as v1.
    \item Minor schema extensions MUST use an \texttt{extensions} namespace and MUST NOT alter existing field meaning.
    \item Major version changes MAY change required fields, semantics, or verification rules, but MUST use a new \texttt{type} discriminator.
    \item A signed object MUST remain verifiable under the rules active for its declared object version and verification time policy.
\end{enumerate}

\subsubsection{v1 and v2 Coexistence}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.32\textwidth} X}
\toprule
Case & Required Verifier Behavior \\
\midrule
Known v1 object & Verify using v1 rules. \\
Known v2 object & Verify using v2 rules. \\
Unknown major version & Reject with \texttt{TSL\_UNSUPPORTED\_OBJECT\_VERSION}. \\
Known object with unknown required field & Reject unless field is inside declared extension namespace. \\
v1 event with v2 assessment & Allowed if the assessment explicitly references the v1 evidence object hash. \\
v2 event with v1 verifier & v1 verifier MUST reject as unsupported, not partially verify. \\
Deprecated object version & Verify historical proofs, but SHOULD warn that new issuance is deprecated. \\
Revoked object version & Reject new issuance and warn on historical verification according to policy. \\
\bottomrule
\end{tabularx}
\end{center}



\subsubsection{Concrete v1-to-v2 Migration Examples}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.28\textwidth} X}
\toprule
Migration & Required Rule \\
\midrule
\texttt{continuity\_assessment.v1} to \texttt{continuity\_assessment.v2} & Preserve the v1 assessment hash as \texttt{legacy\_assessment\_hash}; map the legacy numeric field to \texttt{continuity\_bps = score * 100} only inside a named domain migration profile; map \texttt{label} to the domain-policy label; add target event, domain policy, confidence interval, evidence coverage, scoring profile ID, and expiration. \\
\texttt{attestation.v1} to \texttt{attestation.v2} & Preserve issuer, subject, claim commitment, visibility, timestamps, and signature evidence; add claim class severity, appeal pointer, evidence class, reversal status, and issuer-quality reference. \\
\texttt{agent\_delegation.v1} to \texttt{delegation\_policy.v2} & Convert a monolithic delegation into canonical policy fields: \texttt{policy\_id}, principal, delegate, resources, actions, constraints, valid window, subdelegation policy, revocation pointer, nonce, and principal signature. \\
Agent action migration & A v2 \texttt{agent\_action.v2} MUST reference the relevant delegation chain root and use \texttt{issued\_at} plus \texttt{parameters\_commitment}; verifiers MUST reject legacy \texttt{timestamp} or singular \texttt{parameter\_commitment} in v2 actions. \\
Old proof bundles & Historical bundles remain valid if each embedded object verifies under its declared version. A new verifier MAY wrap old evidence in a \texttt{proof\_bundle.v1} container without rewriting the signed legacy objects. \\
\bottomrule
\end{tabularx}
\end{center}

\subsubsection{Deprecation Policy}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} X}
\toprule
State & Meaning \\
\midrule
\texttt{active} & New issuance and verification are supported. \\
\texttt{deprecated} & Historical verification is supported; new issuance SHOULD warn. \\
\texttt{sunset} & New issuance MUST stop after a published date; historical verification continues. \\
\texttt{revoked} & New issuance is rejected; historical verification shows a security warning. \\
\texttt{research\_only} & Object may appear in experiments but MUST NOT be required for product verification. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Product UX Requirements}

Continuity and risk UX is part of the security model. The interface MUST not collapse protocol validity, domain-specific assessment, and safety into one misleading green checkmark.

\subsubsection{Required Verifier States}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.27\textwidth} X}
\toprule
State & Required UX Meaning \\
\midrule
\texttt{valid\_proof} & Signature, key, inclusion, checkpoint, and revocation checks passed. This does not imply the actor is safe. \\
\texttt{invalid\_signature} & The payload does not verify against the claimed key. Treat as invalid. \\
\texttt{revoked\_key} & The signing key was revoked before the relevant event time or is currently revoked. \\
\texttt{unknown\_identity} & The identity has insufficient continuity or cannot be resolved under current policy. \\
\texttt{insufficient\_evidence} & The assessment provider abstained because evidence coverage was too low. This MUST NOT be rendered as malicious. \\
\texttt{high\_risk} & Risk model or hard security checks indicate elevated risk. UI MUST show specific reasons. \\
\texttt{appealed\_negative\_claim} & A negative claim exists but has active appeal or reversal context. \\
\texttt{agent\_inside\_scope} & Agent action was authorized under current delegation policy. \\
\texttt{agent\_outside\_scope} & Agent action exceeded delegated permissions. \\
\bottomrule
\end{tabularx}
\end{center}

\subsubsection{Required UX Flows}

A production client SHOULD define user flows for:

\begin{enumerate}
    \item first-time \TrustID{} creation;
    \item proof-link generation;
    \item proof-link verification;
    \item browser-extension warning display;
    \item co-signed receipt request;
    \item disclosure consent before revealing raw messages or counterparties;
    \item scoring explanation display;
    \item key revocation and recovery;
    \item negative-attestation appeal;
    \item agent delegation review;
    \item agent action approval or rejection;
    \item model/provider selection;
    \item local-only mode and privacy export/delete controls.
\end{enumerate}

\begin{warningbox}{UX Safety Rule}
A low-evidence identity MUST be displayed as unknown or insufficient evidence, not as suspicious, unless there is affirmative adverse evidence. New users are not Sybils by default.
\end{warningbox}

\subsubsection{Proof-Link Verifier Screen Requirements}

A proof-link verifier MUST show, at minimum:

\begin{enumerate}
    \item proof status: valid, invalid, pending settlement, or unavailable;
    \item signer \TrustID{} and key status;
    \item event class and disclosed fields;
    \item whether raw content was opened or only commitment was checked;
    \item revocation status at event time and current time;
    \item checkpoint status and settlement backend;
    \item optional continuity-assessment provider, target action, policy, model version, label, confidence, expiration, and appeal link;
    \item clear separation between protocol checks and risk assessment;
    \item a shareable verification bundle export.
\end{enumerate}

\subsubsection{Agent Authorization Review Requirements}

For agent actions, the UI MUST show:

\begin{itemize}
    \item principal identity;
    \item delegate identity;
    \item action requested;
    \item resource affected;
    \item value or cost bound when applicable;
    \item policy validity period;
    \item whether subdelegation was used;
    \item whether human approval is required;
    \item exact failure code when authorization fails.
\end{itemize}

\subsection{Operational Requirements}

\subsubsection{Service-Level Objectives}

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.31\textwidth} X}
\toprule
System Component & MVP SLO Target \\
\midrule
Verifier library & Deterministic local verification; no network dependency for already-fetched proof bundles. \\
Hosted verifier API & 99.5\% monthly availability during beta. \\
Relay intake API & 99.5\% monthly availability during beta. \\
Proof retrieval API & p95 under 500 ms for settled proof lookup under nominal load. \\
Checkpoint submission & 99\% of epoch checkpoints submitted within two epoch durations. \\
Revocation propagation & Revocation visible to resolver within 60 seconds after settlement confirmation. \\
Auditor findings & Critical checkpoint conflict findings published within 15 minutes of detection. \\
Scoring provider & Assessment p95 latency under 750 ms for cached feature inputs; expiration enforced. \\
Appeal intake & High-impact negative-claim appeal intake acknowledged within one business day. \\
\bottomrule
\end{tabularx}
\end{center}

\subsubsection{Provider Onboarding}

A scoring provider MUST submit:

\begin{enumerate}
    \item provider identity and signing key;
    \item provider status request: sandbox, active, probation, or research-only;
    \item supported domains;
    \item model card;
    \item scoring profile;
    \item evaluation report;
    \item privacy leakage report;
    \item appeal policy;
    \item security contact;
    \item incident response contact;
    \item signed changelog for each promoted release.
\end{enumerate}

\subsubsection{Auditor Onboarding}

An auditor MUST publish:

\begin{enumerate}
    \item auditor \TrustID{};
    \item monitored relays and shards;
    \item checkpoint verification policy;
    \item log consistency verification method;
    \item disclosure policy for findings;
    \item signing key and rotation policy;
    \item conflict escalation contact.
\end{enumerate}

\subsubsection{Required Runbooks}

The production repository MUST include runbooks for:

\begin{enumerate}
    \item relay outage;
    \item log-node corruption;
    \item checkpoint submission delay;
    \item checkpoint conflict;
    \item relay signing-key compromise;
    \item provider signing-key compromise;
    \item user key compromise;
    \item malicious negative-attestation campaign;
    \item scoring-provider bad release;
    \item emergency model rollback;
    \item schema migration failure;
    \item settlement backend outage;
    \item vulnerability disclosure and patch release;
    \item data retention and deletion request;
    \item privacy incident;
    \item auditor false-positive finding;
    \item high-volume abuse or spam attack.
\end{enumerate}

\subsubsection{Key Ceremonies}

Production deployments SHOULD define ceremonies for:

\begin{itemize}
    \item relay checkpoint signing-key creation;
    \item relay key rotation;
    \item provider signing-key creation;
    \item emergency revocation of provider keys;
    \item smart-contract admin or governance key rotation;
    \item auditor key registration;
    \item disaster recovery restore test.
\end{itemize}

Each ceremony SHOULD produce a signed ceremony record containing participants, date, key identifiers, action type, artifacts generated, and verification checks performed.

\subsection{Open Reference Scoring Governance}

The reference scorer SHOULD be open-source and reproducible. The protocol MUST allow alternative scoring providers, but compatibility requires all providers to emit signed assessments using the same canonical assessment object family.

\subsubsection{Reference Scorer License and Release Rules}

The reference scorer SHOULD use a permissive open-source license for adoption, plus a clear patent and trademark policy if applicable. Each release MUST include:

\begin{enumerate}
    \item semantic version;
    \item signed source archive commitment;
    \item signed model card;
    \item feature registry;
    \item deterministic test vectors;
    \item benchmark results;
    \item privacy leakage report;
    \item changelog describing feature, weight, threshold, and calibration changes;
    \item migration notes from prior scorer versions;
    \item reproducible build instructions.
\end{enumerate}

\subsubsection{Community Review Process}

A reference scorer release SHOULD move through these states:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} X}
\toprule
State & Meaning \\
\midrule
\texttt{draft} & Proposal open for comments; not used for production labels. \\
\texttt{shadow} & Runs on historical and live data without affecting user-facing labels. \\
\texttt{candidate} & Passed automated tests and awaits governance or maintainer approval. \\
\texttt{recommended} & Default reference scorer for supported domains. \\
\texttt{probation} & Known issue or pending review; labels may warn. \\
\texttt{rejected} & Failed promotion gates or security/privacy review. \\
\texttt{retired} & No longer recommended for new issuance; historical assessments remain verifiable. \\
\bottomrule
\end{tabularx}
\end{center}

\subsubsection{Alternative Provider Compatibility}

Alternative scoring providers MAY use different models, features, or weights, but MUST disclose:

\begin{enumerate}
    \item provider identity;
    \item model version;
    \item supported domains;
    \item input evidence classes;
    \item output label semantics;
    \item calibration method;
    \item expiration policy;
    \item appeal process for high-impact labels;
    \item evaluation report commitment;
    \item privacy report commitment.
\end{enumerate}

\subsection{Model Promotion Gates}

A model MUST NOT become a default scorer unless it passes domain-specific promotion gates. The following are reference gates, not universal constants.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.24\textwidth} p{0.20\textwidth} X}
\toprule
Domain & Gate Bias & Minimum Gate \\
\midrule
Anti-phishing & Low false negatives & AUROC at least 9200 bps, AUPRC at least 8500 bps, ECE at most 400 bps, red-team pass. \\
Marketplace trust & Balanced & AUROC at least 8800 bps, sparse-identity false positive at most 200 bps, appeal reversal monitoring. \\
Agent payments & Conservative & Zero known delegation-scope bypasses, settlement and revocation tests pass, value-threshold step-up tested. \\
Open-source maintainer & Low false positives & Drift warnings use step-up by default; maintainer-change false-positive review required. \\
Professional identity & Privacy and defamation safety & No public high-risk label without adverse evidence and appeal path; leakage report required. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Implementation Alignment and Conformance Levels}

The reference implementation MAY initially implement only a release-candidate subset of this specification. The v2 scoring, graph geometry, metadata fingerprint, Sybil, drift, governance, and agent-delegation systems SHOULD be tracked as separate conformance levels.

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.22\textwidth} p{0.34\textwidth} X}
\toprule
Conformance Level & Required Scope & Excluded or Optional Scope \\
\midrule
\texttt{TSL-RC0} & Identity, event commitment, canonicalization, signatures, proof links, local verification & No graph scoring, no ZK, no Sybil assessment. \\
\texttt{TSL-RC1} & Receipts, Merkle log, inclusion proof, checkpoint registry, revocation registry & No public negative claims, no advanced scoring. \\
\texttt{TSL-RC2} & Reference feature extractor, \texttt{ContinuityAssessmentV2}, model card, evaluation report & Advanced private graph proofs optional. \\
\texttt{TSL-RC3} & Metadata fingerprint commitments, graph profile, Sybil assessment, drift report & ZK graph distance optional. \\
\texttt{TSL-RC4} & Delegation policy v2, agent action v2, inside-scope verifier & Multi-agent ZK proof optional. \\
\texttt{TSL-MAINNET} & Audits, runbooks, provider governance, appeal process, monitoring, production SLOs, approved ZK ceremony evidence, and mainnet-grade settlement evidence & Research-only circuits optional; dev fixtures never satisfy production ZK. \\
\bottomrule
\end{tabularx}
\end{center}

\subsection{Production Decision Record}

The following production choices are normative for the mainnet path:

\begin{enumerate}
    \item ZK production requires a new protocol-specific ceremony for the eight required circuit interfaces. Existing development zkeys, local setup outputs, and toy circuits are not accepted.
    \item Mainnet-grade settlement requires \texttt{offline\_receipt\_log\_proof}. \texttt{rpc\_attested\_receipt} is allowed only for RC, testnet, diagnostics, or an explicitly weaker verifier policy.
    \item The default production settlement target is Base mainnet, chain ID \texttt{8453}. Base Sepolia remains the rehearsal network.
    \item Approval is role-bound before it is person-bound. The required roles are \texttt{protocol-security-owner}, \texttt{legal-compliance-owner}, \texttt{platform-ops-owner}, \texttt{protocol-governance-owner}, \texttt{external-zk-auditor}, and \texttt{release-governance-owner}. Before release, each role MUST be mapped to a real signer identity or approval record.
    \item Mainnet approval cannot be generated by code or documentation alone. It requires signed or otherwise auditable evidence for security, legal/compliance, operations, provider governance, deployment, monitoring, and ZK ceremony review.
\end{enumerate}

\subsection{Remaining Mainnet Implementation Plan}

\subsubsection{ZK Artifact and Vector Pipeline}

For each of the eight production circuits, the implementation MUST provide:

\begin{itemize}
    \item reproducible compile command;
    \item R1CS, WASM, zkey, and verification-key artifacts;
    \item circuit release manifest;
    \item verification-key registry entry;
    \item positive proof vector;
    \item public-signal tamper vector;
    \item witness-shape missing-field vector;
    \item wrong-verification-key vector;
    \item dev-circuit rejection vector.
\end{itemize}

\subsubsection{Offline Settlement Verifier}

The implementation MUST add a verifier for \texttt{offline\_receipt\_log\_proof} that checks receipt status, receipt-root inclusion, event/log inclusion, checkpoint identity, contract field hash, contract address, submitter, and finality/source proof from bundle-carried data. It MUST include failure vectors for wrong transaction hash, wrong contract address, wrong event topic, wrong checkpoint identity, wrong contract field hash, reverted receipt, invalid receipt proof, invalid log proof, and insufficient finality.

\subsubsection{Mainnet Evidence Package}

The production-readiness evidence package MUST include:

\begin{itemize}
    \item external circuit audit or review;
    \item ceremony transcript and participant evidence;
    \item verification-key registry approval;
    \item security audit and finding tracker;
    \item legal/compliance approval;
    \item operations and incident-response approval;
    \item deployment addresses and environment proof;
    \item monitoring and SLO evidence;
    \item provider-governance approval;
    \item final release-governance decision.
\end{itemize}

The \texttt{TSL-MAINNET} conformance gate MUST remain red while any of these items are draft, missing, rejected, or stale.

\subsection{Product Requirements Document Annex}

The first product milestone SHOULD be a focused open-source release proof and continuity-verification product, not the entire cross-domain graph/ZK/agent ecosystem.

\subsubsection{MVP User Stories}

\begin{enumerate}
    \item As a maintainer, I can create or bind a \TrustID{} and signing key.
    \item As a maintainer, I can sign a code-release commitment with \texttt{issued\_at}.
    \item As a relay, I can issue trusted receive-time evidence and append the release to a cumulative RFC 9162 log.
    \item As a verifier, I can check JCS bytes, Ed25519 signature, three-time revocation binding, inclusion, consistency context, and checkpoint settlement.
    \item As a reviewer, I can co-sign a private receipt whose public log entry reveals only a salted opaque commitment.
    \item As a maintainer, I can rotate or revoke a compromised key without allowing later backdated submissions.
    \item As a project or package consumer, I can request an optional open-source release-continuity assessment that is bound to the target release and policy.
\end{enumerate}

\subsubsection{MVP Non-Goals}

\begin{itemize}
    \item No global social graph browser.
    \item No universal trust, human-worth, or cross-domain reputation score.
    \item No mandatory KYC.
    \item No public exposure of raw messages or exact counterparties by default.
    \item No graph reputation, recursive neighbor mass, or ZK graph-distance proof as an MVP dependency.
    \item No token requirement for core verification.
\end{itemize}

\subsection{Security and Compliance Package Requirements}

Before production mainnet or enterprise launch, the project SHOULD maintain the following non-code artifacts:

\begin{lstlisting}[style=tslcode]
/security/
  threat-model.md
  secure-sdlc.md
  dependency-policy.md
  cryptography-review.md
  key-management-policy.md
  incident-response.md
  vulnerability-disclosure-policy.md
  audit-plan.md
  abuse-response-policy.md
  privacy-threat-model.md
  negative-claims-risk-review.md
  agent-security-test-plan.md

/legal-compliance/
  privacy-policy-draft.md
  terms-of-service-draft.md
  data-processing-addendum-draft.md
  gdpr-ccpa-mapping.md
  automated-decisioning-review.md
  appeal-and-takedown-policy.md
  law-enforcement-request-policy.md
\end{lstlisting}

This specification is technical architecture, not legal advice. High-impact labels, negative attestations, automated risk assessments, and appeal processes require jurisdiction-specific legal review before production use.

\subsection{Next Required Document}

The next implementation document SHOULD NOT be another broad architecture paper. The next document SHOULD be:

\begin{quote}
\textbf{TSL Open-Source Maintainer Continuity Profile v0: Deterministic Implementation, Calibration Plan, and Test Vectors}
\end{quote}

That document MUST define:

\begin{enumerate}
    \item exact target release and v0 input object set;
    \item feature extraction algorithms;
    \item normalization formulas;
    \item graph construction rules;
    \item domain-specific evidence weights with cryptographic validity excluded as a feature;
    \item calibration method;
    \item confidence interval method;
    \item abstention rules;
    \item label threshold rules;
    \item deterministic test vectors;
    \item benchmark promotion gates;
    \item privacy leakage scoring;
    \item known limitations, seed-governance status, and claims that are explicitly out of scope.
\end{enumerate}

\begin{principlebox}{Final Implementation Direction}
The strongest product path is staged: ship open-source release proof links, verification, private receipts, revocation, cumulative logs, checkpoints, and the transparent release-continuity profile first; then evaluate graph/Sybil/drift methods; then add other domains and advanced privacy proofs. Do not make graph scoring, ZK, or global provider governance blocking requirements for the first useful product.
\end{principlebox}


% ============================================================
\section{Final Summary}
% ============================================================

\TSL{} is not another messaging app. It is not a KYC company. It is not a single reputation score. It is not ``messages on blockchain.''

\TSL{} is a protocol for settling continuity evidence. The initial validated use is open-source maintainer and release continuity.

Its key ideas are:

\begin{itemize}
    \item applications are transports, not trust authorities,
    \item identities own portable cryptographic continuity,
    \item events are signed but content remains private by default,
    \item receipts make interactions mutually witnessed,
    \item append-only logs make history auditable,
    \item blockchain checkpoints make state durable and portable,
    \item domain-specific models may estimate defined compromise risks,
    \item assessments are domain-bound, signed, calibrated, expiring, explainable, and contestable.
\end{itemize}

The research question is whether durable, time-bound cryptographic continuity improves decisions for a specified action and policy. The first paper tests that question for open-source releases.



\subsection{Release-Conformance Checklist}

A team should not treat this document as one undifferentiated implementation target. The robust path is staged conformance:

\begin{center}
\begin{tabularx}{\textwidth}{>{\bfseries}p{0.20\textwidth} X}
\toprule
Level & Product Meaning \\
\midrule
\texttt{TSL-RC0} & Proof/signature baseline: canonicalization, identity, event commitments, proof links, and local verification. \\
\texttt{TSL-RC1} & Logs, settlement, and revocation: Merkle inclusion proofs, checkpoint registry, resolver, and revocation checks. \\
\texttt{TSL-RC2} & Scoring profile and assessment v2: machine-readable scoring profiles, evidence coverage, model cards, evaluation reports, and signed assessments. \\
\texttt{TSL-RC3} & Metadata, graph, Sybil, and drift: fingerprint commitments, graph feature vectors, Sybil assessments, and drift reports. \\
\texttt{TSL-RC4} & Agent delegation/action: delegation policies, scoped agent actions, chain-of-authority verification, and agent UX. \\
\texttt{TSL-MAINNET} & Audits, governance, operations, incident response, provider onboarding, appeals, monitoring, and production SLOs. \\
\bottomrule
\end{tabularx}
\end{center}

\begin{principlebox}{Guiding Principle}
Verify the evidence, bind it to trusted time, and assess only the named action and policy.
\end{principlebox}

\newpage
\begin{thebibliography}{9}

\bibitem{didcore}
World Wide Web Consortium, \textit{Decentralized Identifiers (DIDs) v1.0}, W3C Recommendation. \url{https://www.w3.org/TR/did-core/}

\bibitem{vc2}
World Wide Web Consortium, \textit{Verifiable Credentials Data Model v2.0}, W3C Recommendation, 2025. \url{https://www.w3.org/TR/vc-data-model-2.0/}

\bibitem{erc4337}
Ethereum Improvement Proposals, \textit{ERC-4337: Account Abstraction Using Alt Mempool}. \url{https://eips.ethereum.org/EIPS/eip-4337}

\bibitem{jcs}
A. Rundgren, B. Jordan, and S. Erdtman, \textit{RFC 8785: JSON Canonicalization Scheme (JCS)}. \url{https://www.rfc-editor.org/rfc/rfc8785.html}

\bibitem{eddsa}
S. Josefsson and I. Liusvaara, \textit{RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)}. \url{https://www.rfc-editor.org/rfc/rfc8032.html}

\bibitem{ctv2}
IETF, \textit{RFC 9162: Certificate Transparency Version 2.0}. \url{https://www.rfc-editor.org/rfc/rfc9162.html}

\bibitem{ethscaling}
Ethereum.org, \textit{Scaling Ethereum and Layer 2 Networks}. \url{https://ethereum.org/developers/docs/scaling/}

\end{thebibliography}

\end{document}
