alter table clubs
  alter column created_by set default auth.uid();

create policy "Club creators can view their clubs" on clubs as permissive
  for select to public
    using (clubs.created_by = auth.uid());

