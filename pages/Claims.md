---
slug: "/posts/claims"
date: "2020-09-12"
title: "My Edvolution Badges"
---

## Table of Contents
```toc
from-heading: 2
```

## Badge Journeys
> Badge issuing and recipient journeys for Badgetree and My Edvolution

### Current Journey

```mermaid
 journey
    title Current badge journey
    section Create a badge
      Create an Issuer: 5: Issuer
      Create a BadgeClass: 5: Issuer
      Issue an Assertion: 4: Issuer
      Bake a Badge: 4: Issuer
      Issue a batch of Badges: 2: Issuer
    section Student recieves a badge
      Student recieves badge in an email: 4: Recipient
      Student can download or print a diploma: 0: Recipient
```

The current flow has at least two participants, an **Issuer** and a **Recipient**. In order to reduce the work needed for this feature, we can use Badgetree for the first part of the journey.

With it, we can emit **Issuers**, **BadgeClass** and **Assertions**. The current limitations are as follow:

#### Issuer Limitations

- We don't save the name used when emitting assertions, so we can't recall that information for the diploma.

- Assertions are immediately baked, which requires network and file operations regardless of whether the user claims the badge or not.

- Batch assertions run sequentially because they rely on network and file operations.

#### Recipient Limitations

- The badge can't be inlined because email servers strip metadata.

- There is no public page that hosts the accomplishment or diploma.

- There is no diploma or physical representation of the badge that can be printed out to be used outside of digital contexts.

### Proposed Journey

```mermaid
 journey
    title Current badge journey
    section Create a badge
      Create an Issuer: 5: Issuer
      Create a BadgeClass: 5: Issuer
      Issue an Assertion: 5: Issuer
      Issue a batch of Assertions: 4: Issuer
    section Student recieves a claim code email
      Student recieves code: 5: Recipient
      Student follows QR or URL in email: 5: Recipient
      Issuer fetches Assertion data: 5: Issuer
      Student is prompted for metadata: 5: Recipient
      Issuer bakes the badge: 5: Issuer
      Student can download or print a diploma: 5: Recipient
      Student can register for backpack: 5: Recipient, Issuer
```

#### Proposed Issuer Improvements

- The name is no longer required, only the recipient email.

- Assertions are not immediately baked, which improves batch processing time.

- Batch assertions can be easily parallelized for further performance improvements.

#### Proposed Issuer Limitations

1. The batch assertions relies on CSV rather than UI.

#### Proposed Recipient Improvements

- A diploma PDF is generated with the information in the Assertion along with the metadata requested from the recipient, there is no need to provide the name upfront when creating a batch.

- Since we no longer are sending the badge itself, the CTA is unambiguous i.e. *"Descarga su insignia digital y diploma"* rather than understand what the attachment represents i.e. a digitally signed badge and diploma, and not just an image.

- Rather than end the interaction with the recipient, this model encourages them to interact with the platform. This allows us to convert visitors to users as part of the diploma download process. My Edvolution users could be prompted to save the badge to their user profile, for example with a backpack feature within the platform.

- Badges are no longer baked in batches, but on demand. This gain is compounded when we take into account generating PDF and the additional time that would add to batch processing.

- We would be able to determine when recipients download/bake their badges and/or diplomas. This could be added to Badgetree as a property on Assertions and also be tracked in My Edvolution with the user backpack feature.

#### Proposed Recipient Limitations

- There is an extra step required by students receiving their diplomas rather than just getting an email.

## Flow

```mermaid
graph TD
    AA((Start))
    A([Claim recieved by user])
    B[/Prompt for claim/]
    F[(Fetch assertion <br> from claim)]
    C>Diploma preview]
    D[/Prompt for name/]
    E(Create diploma CTA)
    G[[Send diploma to <br> assertion email]]
    H>Success Page]
    I(Diploma download CTA)
    J(Diploma share CTA)
    K(Backpack CTA)
    ZZ((End))

    AA --> A
    A -- Follows URL or QR --> F
    subgraph Engagement
    A -- Goes to claim page or backpack --> B
    end
    subgraph Preview
    B --> F
    F  --> C
    C -- Missing Data --> D -- Live update --> C
    D -- Diploma data completed --> E
    end
    subgraph Success
    E -- Generate PDF and preview URL --> G
    G -- Redirect --> H
    H --> I
    H --> J
    H --> K
    end
    I -- Download generated PDF --> ZZ
    J -- Redirect to public page --> ZZ
    K -- Redirect to My Edvolution --> ZZ
```

## Improvements
The flow could be improved by adding claim checking. For example, we could defer creating the diploma and badge until the user validates they own the Assertion email. Once claimed, it could prevent subsequent attempts at creating it. Another example is that we could also add expiration dates to the original claims.

## Following Up
This encompasses the first part of the SOW, the follow up would involve converting badge recipients to My Edvolution's backpack feature to store their badges outside of Badgetree in a public URL.
