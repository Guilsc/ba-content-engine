# Publishing Review

## Job to Be Done

Verify that a Content Item is actually eligible to be scheduled or published.

Use this skill in the Publishing & Learnings layer.

This skill is a governance gate, not an approval generator.

## Required Rule

Only Guilherme's explicit approval of the specific Content Item can set:

`Status = Approved`

The following do not count as approval:
- finished draft
- finished visual
- `Visual Ready`
- positive feedback that does not explicitly approve the item

## Inputs

Required:
- Content Item ID
- current status
- final post copy
- final visual when applicable
- publishing channel
- publication date
- publication time
- explicit approval evidence

## Workflow

1. Verify the Content Item ID.
2. Verify `Status = Approved`.
3. Verify explicit user approval exists for that specific item.
4. Verify final copy exists.
5. Verify final visual exists when applicable.
6. Verify channel.
7. Verify date.
8. Verify time.
9. Identify missing information.
10. Only when every required field is present may the item move to `Scheduled`.

## Output Contract

Return:
- Content Item ID
- Approval verified: Yes / No
- Final copy: Ready / Missing
- Final visual: Ready / Not applicable / Missing
- Channel: value / Missing
- Date: value / Missing
- Time: value / Missing
- Publishing readiness:
  - Ready to Schedule
  - Blocked

If blocked, list only the missing or invalid requirements.

## Quality Checks

- Did you infer approval? If yes, stop and correct.
- Did you infer a date or time? If yes, stop and correct.
- Did you advance an unapproved item? If yes, revert.
