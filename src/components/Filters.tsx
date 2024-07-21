import {Button, Combobox, Grid, Input, InputBase, Switch, useCombobox} from "@mantine/core";
import {useFilters} from "../hooks/useFilters";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {DateInput, DateValue} from "@mantine/dates";

export interface FiltersParams {
    sortByDeadline: string | null;
    isChecked: string | null;

    deadline: string | null;
}

export enum TODOStatus {
    TRUE = "TRUE",
    FALSE = "FALSE",
    ALL = "",
}

const TODOLabel: Record<TODOStatus, string> = {
    [TODOStatus.TRUE]: "Completed",
    [TODOStatus.FALSE]: "Incompleted",
    [TODOStatus.ALL]: "All",
}

export const Filters: React.FC = () => {

    const [date, setDate] = useState<DateValue>();

    const {filters, setFilters, resetFilters} = useFilters();

    const statuses = [TODOStatus.TRUE, TODOStatus.FALSE, TODOStatus.ALL];

    const [sortByDeadline, setSortByDeadline] = useState<string>(filters.sortByDeadline || "FALSE");

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = statuses.map((item) => (
        <Combobox.Option value={item} key={item} defaultChecked={item === TODOStatus.ALL}>
            {TODOLabel[item]}
        </Combobox.Option>
    ));

    const handleSwitchOrder = () => {
        const newValueBoolean = sortByDeadline !== "TRUE";
        const newValueString = newValueBoolean ? "TRUE" : "FALSE";
        setSortByDeadline(newValueString);
        setFilters({sortByDeadline: newValueString});
    }

    const handleDateChange = useCallback((value: DateValue) => {
        setDate(value);
        setFilters({deadline: value?.toDateString()});
    }, [])

    const handleResetFilters = () => {
        setDate(null);
        resetFilters();
    }

    return (
        <div className="flex flex-col gap-5">
            <Grid align="end">
                <Grid.Col span={{base: 12, md: 6, lg: 5}}>
                    <Combobox
                        store={combobox}
                        onOptionSubmit={(val) => {
                            setFilters({isChecked: val})
                            combobox.closeDropdown();
                        }}
                    >
                        <Combobox.Target>
                            <InputBase
                                component="button"
                                color="violet"
                                label="Status"
                                type="button"
                                pointer
                                rightSection={<Combobox.Chevron/>}
                                rightSectionPointerEvents="none"
                                onClick={() => combobox.toggleDropdown()}
                            >
                                {TODOLabel[filters.isChecked as TODOStatus] ||
                                    <Input.Placeholder>Status</Input.Placeholder>}
                            </InputBase>
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            {options}
                        </Combobox.Dropdown>
                    </Combobox>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6, lg: 5}}>
                    <div>
                        <DateInput
                            value={date}
                            onChange={(e) => handleDateChange(e)}
                            label="Choose date of deadline"
                            placeholder="Deadline"
                        />
                    </div>
                </Grid.Col>
                <Grid.Col span={{base: 4, md: 6, lg: 2}}>
                    <Button color="red" onClick={handleResetFilters}>Reset
                        filters</Button>
                </Grid.Col>
            </Grid>
            <Switch
                checked={sortByDeadline === "TRUE"}
                onChange={handleSwitchOrder}
                label="Sort by deadline"
                color="violet"
            />
            <Link to="/todos/create" className="mt-5">
                <Button
                    variant="gradient"
                    gradient={{from: 'violet', to: 'red', deg: 145}}
                >
                    Add TODO
                </Button>
            </Link>
        </div>
    );
}