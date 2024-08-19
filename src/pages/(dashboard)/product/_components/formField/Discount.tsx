import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const DiscountForm = ({ form }: any) => {
    return (
        <>
            <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="discount">Giảm giá</FormLabel>
                        <FormControl>
                            <Input {...field} id="discount" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

export default DiscountForm;
