import { useMutation } from "@tanstack/react-query";
import { archiveNoteMutation, deleteNoteMutation, restoreNoteMutation, updateNoteMutation } from "../firebase/mutation/noteMutations";


export const useNoteMutations = (queryClient, userId) => {
    const deleteMutation = useMutation(deleteNoteMutation(queryClient, userId));
    const archiveMutation = useMutation(archiveNoteMutation(queryClient, userId));
    const updateMutation = useMutation(updateNoteMutation(queryClient));
    const restoreMutation = useMutation(restoreNoteMutation(queryClient, userId));

    return {
        deleteMutation,
        archiveMutation,
        updateMutation,
        restoreMutation,
    };
};