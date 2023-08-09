import { supabase } from "@supabase/auth-ui-shared";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";


export const uploadImage = async (file) => {
    console.log(file);

    const fullFileName = file.name.split(".")
    const fileName = fullFileName[0]
    const fileExt = fullFileName[1]
    console.log({fileName, fileExt});

const filePath = `${fileName}-${Math.random()}.${fileExt}`;


const { data, error } = await supabase
.storage
.from('images')
.upload(filePath, file,{
    cacheControl: '3600',
    upsert: false
});

if(error) {
    return { error };
}

const { data: { PublicUrl }, error: publicUrlError}  = await supabase
.storage
.from('images')
.getPublicUrl(data.path);

if(publicUrlError) {
    return { error: publicUrlError };
}

return {
    error: false,
    PublicUrl,
};
};