# Idea Development

## Job to Be Done

Develop an `Idea` into a decision-ready concept inside Idea Tank.

Use this skill before the user decides whether to promote an idea to `Candidate`.

Do not write the final LinkedIn post.

## Inputs

Required:
- idea title or raw concept

Helpful:
- source signal
- Why Now
- evidence
- related backlog items
- target series

## Workflow

1. State the core idea in one clear sentence.
2. Explain Why Now.
3. Identify the senior BA implication.
4. Find the non-obvious or second-order angle.
5. Check whether the idea duplicates or overlaps existing content.
6. Assess saturation:
   - Low
   - Medium
   - High
7. Assess evidence strength:
   - Strong
   - Moderate
   - Weak
8. Identify what would make the idea distinct.
9. Define the strongest thesis candidate.
10. Recommend whether it is ready for a promotion decision, but do not change status without explicit user approval.

## Output Contract

Return:
- Proposed title
- Core idea
- Why Now
- BA implication
- Non-obvious angle
- Saturation
- Evidence strength
- Source
- Backlog overlap
- Strongest thesis
- Open questions / evidence gaps
- Status: `Idea`
- Promotion decision needed: `Yes` or `No`

## Quality Checks

- Is this a thesis rather than only a topic?
- Could a generic AI creator publish it unchanged?
- Does it materially affect senior BA work?
- Is the evidence sufficient for the proposed claim?
- Did the status remain `Idea` unless the user explicitly promoted it?
