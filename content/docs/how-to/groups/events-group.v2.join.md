`group.v2.join` happens when **you** join or are added to a group.

```jsonc { title="group.v2.join" }
{
  "event": "group.v2.join",
  "session": "default",
  "payload": {
    "group": {
      "id": "1231231232@g.us",
      "subject": "Work Group",
      "description": "Group description",
      "invite": "https://chat.whatsapp.com/invitecode",
      "membersCanAddNewMember": true,
      "membersCanSendMessages": true,
      "newMembersApprovalRequired": true,
      "participants": [
        {
          "id": "99999@c.us",
          "role": "participant"
        }
      ]
    },
    "timestamp": 789456123,
    "_data": {}
  }
}
```

- `group` - group information
  - `id` - group ID
  - `subject` - group name
  - `description` - group description
  - `invite` - invite link
  - `membersCanAddNewMember` - if members can add new members
  - `membersCanSendMessages` - if members can send messages
  - `newMembersApprovalRequired` - if new members need approval from admins
  - `participants` - list of participants (check [group.v2.participants](#groupv2participants) for more details)
- `timestamp` - event timestamp
- `_data` - engine specific data
