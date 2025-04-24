import { useContext } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useShowToastNotification } from '../../../hooks/useShowToastNotification';
import { PostsContext } from '../../../context/landing/store/PostsContext';

export const usePostResponse = () => {
    const { showToast } = useShowToastNotification();
    const { removeError } = useContext(PostsContext);
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const handleSuccessfulMessage = (screen: string, text1: string) => {
        showToast('success', text1);

        const timer = setTimeout(() => {
            navigation.navigate(screen);
        }, 2000);

        return () => clearTimeout(timer);
    };

    const handleErrorMenssage = (errorMessage: string, text1: string, screen: string) => {
        if (!errorMessage) { return; }
        showToast('error', text1, errorMessage);

        const timer = setTimeout(() => {
            removeError();
            navigation.navigate(screen);
        }, 3000);

        return () => clearTimeout(timer);
    };

    return {
        handleSuccessfulMessage,
        handleErrorMenssage,
    };
};
