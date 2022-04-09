import { normalize, schema } from "normalizr";

const data = {
  id: 3,
  name: "third room",
  createdAt: "2022-04-05T10:58:08.680Z",
  updatedAt: "2022-04-05T10:58:08.680Z",
  deletedAt: null,
  owners: [
    {
      id: 3,
      subId: "62445181bafbab006ae74d2e",
      name: "admin",
      email: "admin@example.com",
      createdAt: "2022-04-05T10:42:10.627Z",
      updatedAt: "2022-04-05T10:42:10.627Z",
      deletedAt: null,
    },
  ],
  members: [
    {
      id: 3,
      subId: "62445181bafbab006ae74d2e",
      name: "admin",
      email: "admin@example.com",
      createdAt: "2022-04-05T10:42:10.627Z",
      updatedAt: "2022-04-05T10:42:10.627Z",
      deletedAt: null,
    },
  ],
  messages: [],
};

const owner = new schema.Entity('owners');
const member = new schema.Entity('members');
const mySchema = {owners: [owner], members: [member]};
const normalizedData = normalize(data, mySchema);
console.log(normalizedData);

// {
//   "id": 3,
//   "name": "third room",
//   "createdAt": "2022-04-05T10:58:08.680Z",
//   "updatedAt": "2022-04-05T10:58:08.680Z",
//   "deletedAt": null,
//   "owners": [
//       {
//           "id": 3,
//           "subId": "62445181bafbab006ae74d2e",
//           "name": "admin",
//           "email": "admin@example.com",
//           "createdAt": "2022-04-05T10:42:10.627Z",
//           "updatedAt": "2022-04-05T10:42:10.627Z",
//           "deletedAt": null
//       }
//   ],
//   "members": [
//       {
//           "id": 3,
//           "subId": "62445181bafbab006ae74d2e",
//           "name": "admin",
//           "email": "admin@example.com",
//           "createdAt": "2022-04-05T10:42:10.627Z",
//           "updatedAt": "2022-04-05T10:42:10.627Z",
//           "deletedAt": null
//       }
//   ],
//   "messages": []
// }
