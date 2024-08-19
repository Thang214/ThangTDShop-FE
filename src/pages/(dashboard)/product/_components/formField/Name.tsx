import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const NameForm = ({ form }: any) => {
    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="name">Tên sản phẩm</FormLabel>
                        <FormControl>
                            <Input {...field} id="name" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
        </>
    );
};
export default NameForm;
