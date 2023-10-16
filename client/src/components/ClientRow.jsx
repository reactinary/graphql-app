import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';


export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // --------- 1️⃣ UPDATE STATE AFTER DELETE : REFETCH QUERIES 1️⃣ -------------
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // 💡 [ Delete client => delete Project ] ===> refetch Clients + Projects 💡


    // --------- 2️⃣ UPDATE STATE AFTER DELETE : UPDATE THE CACHE 2️⃣ -------------
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button onClick={deleteClient}  className='btn btn-danger btn-sm'>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
